import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoDialogComponent } from './resumo.component';

describe('ResumoComponent', () => {
  let component: ResumoDialogComponent;
  let fixture: ComponentFixture<ResumoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
