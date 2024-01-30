// Import necessary modules and classes
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

// Component decorator
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  // Array to store products
  products: Product[] = [];

  // Default category ID and search mode flag
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  //Defualt For Pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  previousKeyword: string = "";

  // Constructor injecting ProductService and ActivatedRoute
  constructor(private productService: ProductService,private cartService:CartService, private route: ActivatedRoute ) { }

  // Lifecycle hook - ngOnInit
  ngOnInit(): void {
    // Subscribe to route parameter changes and call listProducts method
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  // This method is responsible for updating the page size and refreshing the product list accordingly.
  updatePageSize(size: string) {
    // Convert the incoming string to a number and assign it to the property `thePageSize`.
    this.thePageSize = +size;

    // Reset the page number to 1 when updating the page size to ensure starting from the first page.
    this.thePageNumber = 1;

    // Call the `listProducts` method to fetch and display products based on the updated page size and number.
    this.listProducts();
  }

  // Method to determine whether to handle search or list products
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  // Method to handle search for products
  handleSearchProducts() {


    // Get the keyword from the route parameters
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have defferent keyword then previous 
    //set thepagenumber to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;

    }
    this.previousKeyword = theKeyword;

    // Subscribe to the searchProducts method of ProductService
    this.productService.searchProductsPaginate
      (this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe(this.processResult())
  }
  ;

  // Method to handle listing of products
  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductsPaginat(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(
        data => {
          this.products = data._embedded.products;
          this.thePageNumber = data.page.number + 1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
        }
      );
  }
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;

    }

  }
  addToCart(theProduct: Product) {
    console.log(theProduct);
    const thecartItem = new CartItem(theProduct);
    console.log(thecartItem.quantity);



    this.cartService.addToCart(thecartItem);
  }
}


