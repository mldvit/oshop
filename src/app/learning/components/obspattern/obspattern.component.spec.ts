import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObspatternComponent } from './obspattern.component';

describe('ObspatternComponent', () => {
  let component: ObspatternComponent;
  let fixture: ComponentFixture<ObspatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObspatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObspatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
