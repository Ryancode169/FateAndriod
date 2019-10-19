import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifePage } from './life.page';

describe('LifePage', () => {
  let component: LifePage;
  let fixture: ComponentFixture<LifePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
