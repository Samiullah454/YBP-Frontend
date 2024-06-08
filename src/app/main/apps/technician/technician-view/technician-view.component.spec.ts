import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianViewComponent } from './technician-view.component';

describe('TechnicianViewComponent', () => {
  let component: TechnicianViewComponent;
  let fixture: ComponentFixture<TechnicianViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
