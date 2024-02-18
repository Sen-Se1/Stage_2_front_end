import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEtudComponent } from './create-etud.component';

describe('CreateEtudComponent', () => {
  let component: CreateEtudComponent;
  let fixture: ComponentFixture<CreateEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEtudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
