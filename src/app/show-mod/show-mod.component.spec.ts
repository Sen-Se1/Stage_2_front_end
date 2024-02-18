import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowModComponent } from './show-mod.component';

describe('ShowModComponent', () => {
  let component: ShowModComponent;
  let fixture: ComponentFixture<ShowModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowModComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
