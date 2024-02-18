import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAffctComponent } from './show-affct.component';

describe('ShowAffctComponent', () => {
  let component: ShowAffctComponent;
  let fixture: ComponentFixture<ShowAffctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAffctComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAffctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
