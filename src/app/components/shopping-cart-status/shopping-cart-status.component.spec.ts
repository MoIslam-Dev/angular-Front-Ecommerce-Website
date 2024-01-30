import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartStatusComponent } from './shopping-cart-status.component';

describe('ShoppingCartStatusComponent', () => {
  let component: ShoppingCartStatusComponent;
  let fixture: ComponentFixture<ShoppingCartStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartStatusComponent]
    });
    fixture = TestBed.createComponent(ShoppingCartStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
