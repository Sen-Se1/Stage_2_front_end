import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEtudComponent } from './update-etud.component';

describe('UpdateEtudComponent', () => {
  let component: UpdateEtudComponent;
  let fixture: ComponentFixture<UpdateEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateEtudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
