import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactveFormComponent } from './reactive-form.component';

describe('ReactveFormComponent', () => {
  let component: ReactveFormComponent;
  let fixture: ComponentFixture<ReactveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
