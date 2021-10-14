import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupOfDiceComponent } from './cup-of-dice.component';

describe('CupOfDiceComponent', () => {
  let component: CupOfDiceComponent;
  let fixture: ComponentFixture<CupOfDiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupOfDiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupOfDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
