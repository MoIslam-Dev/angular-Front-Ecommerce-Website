import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Array to store cart items
  cartItems: CartItem[] = [];

  // Subjects to notify subscribers about changes in total price and quantity
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  /**
   * Adds an item to the cart.
   * If the item already exists, increments the quantity; otherwise, adds a new item.
   * Updates total price and quantity, and notifies subscribers.
   *
   * @param theCartItem The item to be added to the cart.
   */
  addToCart(thecartItem: CartItem): void {
    // Check if we already have the item in our cart
    let existingCartItem: CartItem | undefined = this.cartItems.find((tempCartItem) => tempCartItem.id === thecartItem.id);

    if (existingCartItem) {
      // Increment the quantity if the item is already in the cart
      existingCartItem.quantity++;
    } else {
      // Add the item to the cart if it's not already present
      this.cartItems.push({ ...thecartItem });
    }

    // Update the total price and quantity
    this.calculateCartTotals();
  }

  /**
   * Calculates and updates the total price and quantity of items in the cart.
   * Notifies subscribers about the changes.
   */
   calculateCartTotals(): void {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let cartItem of this.cartItems) {
      // Calculate subtotal for each item
      const subTotalPrice = cartItem.unitPrice * cartItem.quantity;

      // Accumulate total price and total quantity
      totalPriceValue += subTotalPrice;
      totalQuantityValue += cartItem.quantity;
    }

    // Update the subjects with the new values
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
 
  removeCart(theCartItem :CartItem) {
    theCartItem.quantity--;
    if(theCartItem.quantity==0){
      this.remove(theCartItem);
    }
  }
  remove(theCartItem: CartItem) {
    //get the index of the itel in the array
    const index=this.cartItems.findIndex(tempCartItem=>theCartItem.id =tempCartItem.id);
    //if we found it remove it 
    if(index>-1){
      this.cartItems.splice(index,1);
      this.calculateCartTotals();

    }

  }
}
