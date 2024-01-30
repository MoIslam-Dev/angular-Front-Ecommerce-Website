import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details-component',
  templateUrl: './cart-details-component.component.html',
  styleUrls: ['./cart-details-component.component.css']
})
export class CartDetailsComponentComponent implements OnInit {


 
  cartItems :CartItem[] = [];
  totalPrice :number = 0;
  totalQuantity = 0;
  constructor(private cartService :CartService){}
  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    //get the cart item 
    this.cartItems =this.cartService.cartItems;
    //subscribe to the total price
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice = data
    )
     //subscribe to the total quantity
     this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity = data
    )
    //computed the total
    this.cartService.calculateCartTotals();
  }
  increaseQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
    }
    decreaseQuantity(cartItem: CartItem) {
      
        this.cartService.removeCart(cartItem);
    
    }
    remove(_t14: CartItem) {
      this.cartService.remove(_t14);
      }

}
