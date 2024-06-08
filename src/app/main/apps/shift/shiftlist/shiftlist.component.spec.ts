import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftlistComponent } from './shiftlist.component';

describe('ShiftlistComponent', () => {
  let component: ShiftlistComponent;
  let fixture: ComponentFixture<ShiftlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
