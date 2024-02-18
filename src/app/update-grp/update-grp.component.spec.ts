import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGrpComponent } from './update-grp.component';

describe('UpdateGrpComponent', () => {
  let component: UpdateGrpComponent;
  let fixture: ComponentFixture<UpdateGrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateGrpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateGrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
