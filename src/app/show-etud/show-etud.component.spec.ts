import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEtudComponent } from './show-etud.component';

describe('ShowEtudComponent', () => {
  let component: ShowEtudComponent;
  let fixture: ComponentFixture<ShowEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowEtudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
