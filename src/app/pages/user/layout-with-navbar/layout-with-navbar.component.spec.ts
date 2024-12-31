import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutWithNavbarComponent } from './layout-with-navbar.component';

describe('LayoutWithNavbarComponent', () => {
  let component: LayoutWithNavbarComponent;
  let fixture: ComponentFixture<LayoutWithNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutWithNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutWithNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
