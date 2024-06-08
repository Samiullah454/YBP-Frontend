import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianTypeComponent } from './technician-type.component';

describe('TechnicianTypeComponent', () => {
  let component: TechnicianTypeComponent;
  let fixture: ComponentFixture<TechnicianTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
