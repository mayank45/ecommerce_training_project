import { DebugElement } from '@angular/core';
import {  ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CustLoginComponent } from './cust-login.component';

describe('CustLoginComponent', () => {
  let component: CustLoginComponent;
  let fixture: ComponentFixture<CustLoginComponent>;
  let de:DebugElement;
  let el:HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustLoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css("form"));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test if form is disabled if fields are empty',waitForAsync(()=>{
      component.loginForm.controls['email'].setValue('');
      component.loginForm.controls['password'].setValue('');
      fixture.detectChanges();
      expect(el.querySelector('button').disabled).toBeTruthy;
  }));
});
