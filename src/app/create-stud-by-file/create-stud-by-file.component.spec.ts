import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudByFileComponent } from './create-stud-by-file.component';

describe('CreateStudByFileComponent', () => {
  let component: CreateStudByFileComponent;
  let fixture: ComponentFixture<CreateStudByFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStudByFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateStudByFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
