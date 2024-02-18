import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePwdModComponent } from './change-pwd-mod.component';

describe('ChangePwdModComponent', () => {
  let component: ChangePwdModComponent;
  let fixture: ComponentFixture<ChangePwdModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePwdModComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePwdModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
