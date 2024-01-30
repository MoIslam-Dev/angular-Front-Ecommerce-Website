import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalQuantity: number = 0;
  totalPrice: number = 0.0;

  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];

  onSubmit() {
    throw new Error('Method not implemented.');
  }
  checkoutFormGroup!: FormGroup;

  constructor( private cartService: CartService,private formBuilder: FormBuilder, private formService: FormService) { }

  ngOnInit(): void {
    this.updateReviewOrder();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });
    
    //credit card month
    const startMonth: number = new Date().getMonth() + 1;
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonth = data;
      }
    )
    //credit card years 
    this.formService.getCreditCardYear().subscribe(
      data => { this.creditCardYear = data; }
    )

  }
  updateReviewOrder() {
    //subscribe for the cart total price 
    this.cartService.totalPrice.subscribe(
      

      data => this.totalPrice = data


    );
    //subscribe for the cart total Quantity 
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.cartService.calculateCartTotals();

  }
  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      // Copy shipping address to billing address
      // Copy shipping address to billing address
      this.checkoutFormGroup.controls['billingAddress'].setValue
        (this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      // Clear billing address if the checkbox is unchecked
      // Clear billing address if the checkbox is unchecked
      this.checkoutFormGroup.controls['billingAddress'].reset();
    };
  }
  handelMonthAndYear() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    //if the selected year = current year we have to start from the current month 
    let startMonth: number;
    if (selectedYear === currentYear) {
      startMonth = new Date().getMonth() + 1;

    }
    else {
      startMonth = 1;
    }
    this.formService.getCreditCardMonths(startMonth).subscribe(
      monthsData => {
        this.creditCardMonth = monthsData;
      }
    )



  }

}


