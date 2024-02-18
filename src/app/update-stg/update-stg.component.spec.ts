import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStgComponent } from './update-stg.component';

describe('UpdateStgComponent', () => {
  let component: UpdateStgComponent;
  let fixture: ComponentFixture<UpdateStgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateStgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
