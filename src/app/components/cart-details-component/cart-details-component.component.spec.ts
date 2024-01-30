import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailsComponentComponent } from './cart-details-component.component';

describe('CartDetailsComponentComponent', () => {
  let component: CartDetailsComponentComponent;
  let fixture: ComponentFixture<CartDetailsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartDetailsComponentComponent]
    });
    fixture = TestBed.createComponent(CartDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
