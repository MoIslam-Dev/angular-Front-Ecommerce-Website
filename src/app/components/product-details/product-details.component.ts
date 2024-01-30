import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product! :Product;
  constructor(
    private productservice:ProductService,
    private cartService:CartService,
    private rout:ActivatedRoute
  ){

  }
  ngOnInit(): void {
    this.rout.paramMap.subscribe(()=>{
      this.hundelProductDetails();
    })
  }
  addToCart() {
    console.log(this.product);
    const thecartItem = new CartItem(this.product);
  
    this.cartService.addToCart(thecartItem);
  }
  hundelProductDetails() {
    //get the id and covert it to number with+
    const productId:number =+this.rout.snapshot.paramMap.get('id')!;
    console.log("the product Id is "+productId);
    this.productservice.getProduct(productId).subscribe(
      data=> {
        this.product =data;
      }
    )


  }

}
