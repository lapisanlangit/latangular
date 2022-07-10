import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KppnComponent } from './kppn.component';

describe('KppnComponent', () => {
  let component: KppnComponent;
  let fixture: ComponentFixture<KppnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KppnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KppnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
