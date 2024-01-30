import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart-status',
  templateUrl: './shopping-cart-status.component.html',
  styleUrls: ['./shopping-cart-status.component.css']
})
export class ShoppingCartStatusComponent implements OnInit {
  totalPrice :number = 0.0;
  totalQuantity:number =0;
  constructor(private cartService :CartService){}
  ngOnInit(): void {
    this.updateCartStatut();

  }
  updateCartStatut() {
    //subscribe for the cart total price 
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice = data
    );
      //subscribe for the cart total Quantity 
      this.cartService.totalQuantity.subscribe(
        data=>this.totalQuantity = data
      );
  }


}
