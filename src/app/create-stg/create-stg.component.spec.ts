import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStgComponent } from './create-stg.component';

describe('CreateStgComponent', () => {
  let component: CreateStgComponent;
  let fixture: ComponentFixture<CreateStgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateStgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
