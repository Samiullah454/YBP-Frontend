import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnicianTypeComponent } from './add-technician-type.component';

describe('AddTechnicianTypeComponent', () => {
  let component: AddTechnicianTypeComponent;
  let fixture: ComponentFixture<AddTechnicianTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTechnicianTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTechnicianTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
