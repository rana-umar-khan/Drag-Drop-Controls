import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragableComponentsComponent } from './dragable-components.component';

describe('DragableComponentsComponent', () => {
  let component: DragableComponentsComponent;
  let fixture: ComponentFixture<DragableComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragableComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragableComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
