import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base/base.service';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Satker } from './satker';


@Injectable()
export class SatkerService extends BaseService {


  constructor(private http: HttpClient) {
    super();

  }


  public getSatker(): Observable<Satker[]> {
    return this.http.get<Satker[]>(this.URL_ROOT + 'data/satker/getSatker')
      .pipe(
        catchError(this.handleError)
      );
  }

  public getSatkerbyKPPN(kdkppn:string): Observable<Satker[]> {
    return this.http.get<Satker[]>(this.URL_ROOT + 'data/satker/getSatkerbyKPPN?kdkppn='+kdkppn)
      .pipe(
        catchError(this.handleError)
      );
  }

  public cekSatker(nilaiSimpan:Satker): Observable<any> {
    return this.http.post<any>(this.URL_ROOT + 'data/satker/cekSatker',nilaiSimpan)
      .pipe(
        catchError(this.handleError)
      );
  }

  public saveSatker(nilaiSimpan:Satker): Observable<any> {
    return this.http.post<any>(this.URL_ROOT + 'data/satker/saveSatker',nilaiSimpan)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateSatker(nilaiSimpan:Satker): Observable<any> {
    return this.http.post<any>(this.URL_ROOT + 'data/satker/updateSatker',nilaiSimpan)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteSatker(nilaiSimpan:any): Observable<any> {
    return this.http.post<any>(this.URL_ROOT + 'data/satker/deleteSatker',nilaiSimpan)
      .pipe(
        catchError(this.handleError)
      );
  }

}

