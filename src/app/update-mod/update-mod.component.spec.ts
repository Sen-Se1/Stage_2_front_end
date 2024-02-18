import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModComponent } from './update-mod.component';

describe('UpdateModComponent', () => {
  let component: UpdateModComponent;
  let fixture: ComponentFixture<UpdateModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateModComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
