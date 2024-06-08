import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceaddComponent } from './serviceadd.component';

describe('ServiceaddComponent', () => {
  let component: ServiceaddComponent;
  let fixture: ComponentFixture<ServiceaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
