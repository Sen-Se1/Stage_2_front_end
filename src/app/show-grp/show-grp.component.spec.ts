import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGrpComponent } from './show-grp.component';

describe('ShowGrpComponent', () => {
  let component: ShowGrpComponent;
  let fixture: ComponentFixture<ShowGrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowGrpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowGrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
