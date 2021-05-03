import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReturnDetailsComponent } from './order-return-details.component';

describe('OrderReturnDetailsComponent', () => {
  let component: OrderReturnDetailsComponent;
  let fixture: ComponentFixture<OrderReturnDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReturnDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReturnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
