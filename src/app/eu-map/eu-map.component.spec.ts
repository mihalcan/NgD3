/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EuMapComponent } from './eu-map.component';

describe('EuMapComponent', () => {
  let component: EuMapComponent;
  let fixture: ComponentFixture<EuMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
