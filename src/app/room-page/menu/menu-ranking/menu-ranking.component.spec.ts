import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRankingComponent } from './menu-ranking.component';

describe('MenuRankingComponent', () => {
  let component: MenuRankingComponent;
  let fixture: ComponentFixture<MenuRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
