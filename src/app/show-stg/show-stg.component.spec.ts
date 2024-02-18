import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStgComponent } from './show-stg.component';

describe('ShowStgComponent', () => {
  let component: ShowStgComponent;
  let fixture: ComponentFixture<ShowStgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowStgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowStgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
