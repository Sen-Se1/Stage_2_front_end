import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAffctComponent } from './update-affct.component';

describe('UpdateAffctComponent', () => {
  let component: UpdateAffctComponent;
  let fixture: ComponentFixture<UpdateAffctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAffctComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAffctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
