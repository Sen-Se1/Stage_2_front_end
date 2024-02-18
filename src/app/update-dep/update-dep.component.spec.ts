import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepComponent } from './update-dep.component';

describe('UpdateDepComponent', () => {
  let component: UpdateDepComponent;
  let fixture: ComponentFixture<UpdateDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
