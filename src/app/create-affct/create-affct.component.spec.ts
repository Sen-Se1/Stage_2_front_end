import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAffctComponent } from './create-affct.component';

describe('CreateAffctComponent', () => {
  let component: CreateAffctComponent;
  let fixture: ComponentFixture<CreateAffctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAffctComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAffctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
