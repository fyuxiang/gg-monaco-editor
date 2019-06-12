import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GGMonacoEditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: GGMonacoEditorComponent;
  let fixture: ComponentFixture<GGMonacoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GGMonacoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GGMonacoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
