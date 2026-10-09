import { ComponentFixture } from '@angular/core/testing';
import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';

export function findComponentElement<T>( fixture: ComponentFixture<T>, selector: string ): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

export function findComponent<F>( fixture: ComponentFixture<F>, component: Type<any> ) {
  const debugElement = fixture.debugElement.query(By.directive( component ));
  return debugElement.componentInstance;
}
