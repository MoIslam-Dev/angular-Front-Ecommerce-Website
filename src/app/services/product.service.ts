// Import necessary modules and classes
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

// Service decorator to indicate that this service should be provided at the root level
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Define the base URLs for product and category data
  private baseurl = 'http://localhost:8080/api/products';
  private categoryURL = 'http://localhost:8080/api/productcategory';

  // Constructor injecting the HttpClient service
  constructor(private httpClient: HttpClient) { }

  // Method to fetch paginated products based on category and page information
  getProductsPaginat(page: number, size: number, thecategoryId: number): Observable<GetResponseProducts> {

    // Construct the URL for paginated product search by category
    const searchURL = `${this.baseurl}/search/findByCategoryId?id=${thecategoryId}&page=${page}&size=${size}`;

    // Make a GET request and return the Observable
    return this.httpClient.get<GetResponseProducts>(searchURL);
  }

  // Method to fetch a list of products based on category
  getProductList(thecategoryId: number): Observable<Product[]> {
    const searchURL = `${this.baseurl}/search/findByCategoryId?id=${thecategoryId}`;

    // Call the private method to handle the common logic for fetching products
    return this.getProducts(searchURL);
  }

  // Method to fetch a list of product categories
  getProductCategory(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseCategories>(this.categoryURL).pipe(
      map((response: GetResponseCategories) => response._embedded.productcategory)
    );
  }

  // Method to search for products based on a keyword
  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseurl}/search/findByNameContaining?name=${keyword}`;

    // Call the private method to handle the common logic for fetching products
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number, 
    thePageSize: number, 
    theKeyword: string): Observable<GetResponseProducts> {

// need to build URL based on keyword, page and size 
const searchUrl = `${this.baseurl}/search/findByNameContaining?name=${theKeyword}`
+ `&page=${thePage}&size=${thePageSize}`;

return this.httpClient.get<GetResponseProducts>(searchUrl);
}

  // Private method to handle common logic for fetching products
  private getProducts(searchURL: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchURL).pipe(
      map((response: GetResponseProducts) => response._embedded.products)
    );
  }

  // Method to fetch details of a specific product by ID
  getProduct(productId: number): Observable<Product> {
    const productURL = `${this.baseurl}/${productId}`;

    // Make a GET request and return the Observable
    return this.httpClient.get<Product>(productURL);
  }
}

// Interface defining the structure of the response for products
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

// Interface defining the structure of the response for product categories
interface GetResponseCategories {
  _embedded: {
    productcategory: ProductCategory[];
  };
}
