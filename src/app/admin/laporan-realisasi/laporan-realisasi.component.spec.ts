import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanRealisasiComponent } from './laporan-realisasi.component';

describe('LaporanRealisasiComponent', () => {
  let component: LaporanRealisasiComponent;
  let fixture: ComponentFixture<LaporanRealisasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanRealisasiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanRealisasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
