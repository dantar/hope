import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPoolComponent } from './card-pool.component';

describe('CardPoolComponent', () => {
  let component: CardPoolComponent;
  let fixture: ComponentFixture<CardPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
