import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Pesan } from 'src/app/shared/pesan/pesan';
import { Satker } from './satker';
import { SatkerService } from './satker.service';
import {Subject} from 'rxjs';
import { KPPN } from '../kppn/kppn';
import { KppnService } from '../kppn/kppn.service';

declare var jQuery:any;

@Component({
  selector: 'app-satker',
  templateUrl: './satker.component.html',
  styleUrls: ['./satker.component.css']
})
export class SatkerComponent implements OnInit,OnDestroy {

  public listSatker:Satker[];
  public listKPPN:KPPN[];

  public isiSatker:Satker;
  public Satkerini:Satker;
  private satkersub:Subscription;
  private kppnsub:Subscription;

  public ajax:boolean=false;
  private rekam:boolean=false;
  setPesan:Pesan;
  isDisabled:boolean=false;

  dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<void> = new Subject<void>();
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private satkerservice:SatkerService,private kppnservice:KppnService,
    private toast:ToastrService) { }

  ngOnInit(): void {

    this.isiSatker={
      "kdkppn":"",
      "nmsatker":"",
      "kdsatker":"",
      
    }
    this.Satkerini={
      "kdkppn":"",
      "nmsatker":"",
      "kdsatker":"",

    }
    
    this.tampilData();
    this.tampilReferensi();
  }

  private tampilData():void{

    this.ajax=true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.satkersub=this.satkerservice.getSatker().subscribe({
      next:(data)=>{
        this.listSatker=data;
        this.ajax=false;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next(data);

      },
      error: (error) => {
        console.log(error);
        this.ajax=false;
        return;
      }
    })
  }

  private tampilReferensi():void{

    this.satkersub=this.kppnservice.getKPPN().subscribe({
      next:(data)=>{
        this.listKPPN=data;
        console.log(this.listKPPN)


      },
      error: (error) => {
        console.log(error);
        return;
      }
    })
  }

  public rekamData(): void {

    this.kosong();
    this.isDisabled=false;

    jQuery('#ctnRekam').modal('show')

    this.rekam = true;
    setTimeout(function () {
       jQuery('#kdsatker').focus();
    }, 500);

}

public kosong(): void {
    this.isiSatker.kdkppn = '';
    this.isiSatker.nmsatker = '';
    this.isiSatker.kdsatker = '';

   
}


public editData(item: Satker): void {


  this.isDisabled=true;

  this.isiSatker.kdkppn = item.kdkppn;
  this.isiSatker.nmsatker = item.nmsatker;
  this.isiSatker.kdsatker = item.kdsatker;


  this.rekam =false;
  jQuery('#ctnRekam').modal('show');

  //focus
  setTimeout(function () {
      jQuery('#nmsatker').focus();
  }, 500);
}

  saveData(){


    if(this.isiSatker.kdkppn==''){
      this.toast.error('kode Satker harus diisi');
      setTimeout(function () {
        jQuery('#kdkppn').focus();
     }, 500);
 
      return;
    }
    if(this.isiSatker.nmsatker==''){
      this.toast.error('nama satker harus diisi');
      setTimeout(function () {
        jQuery('#nmsatker').focus();
     }, 500);
 
      return;
    }

    if(this.isiSatker.kdkppn==''){
      this.toast.error('kode kppn harus diisi');
      setTimeout(function () {
        jQuery('#kdkppn').focus();
     }, 500);
 
      return;
    }


  var nilaiSimpan = {
      "kdkppn": this.isiSatker.kdkppn,
      "nmsatker": this.isiSatker.nmsatker,
      "kdsatker": this.isiSatker.kdsatker

  };

  if (this.rekam == true) {
      this.satkerservice.cekSatker(nilaiSimpan)
          .subscribe((hasil) => {
              let nAda = hasil.length;
              if (nAda > 0) {
                this.toast.warning('Kode Satker ini sudah ada,ganti yang lain');
                return;
              } else {

                  this.satkerservice.saveSatker(nilaiSimpan)
                      .subscribe( {
                        next:(data)=>{
                        this.tampilData();
                        this.toast.success(data.message)
                        this.rekam = false;
                        jQuery('#ctnRekam').modal('hide');

                      },
                      error: (error) => {
                        this.toast.error(error)
                        return;
                      }
                    })
                 
              }

          });
  } else {
      this.satkerservice.updateSatker(nilaiSimpan)
          .subscribe({ 
            next:(data)=>{
            this.tampilData();
            this.toast.success(data.message)
            this.rekam = false;
            jQuery('#ctnRekam').modal('hide');
                     
          },
          error: (error) => {
            this.toast.error(error)
            this.rekam = false;
            jQuery('#ctnRekam').modal('hide');
            return;
          }
        })
  }

  }

  yesHapus(event:any){

    let paramHapus = { "kdsatker": this.Satkerini.kdsatker };

    this.satkerservice.deleteSatker(paramHapus)
    .subscribe( {
      next:(data)=>{
      this.tampilData();
      this.toast.success(data.message)
    },
    error: (error) => {
      this.toast.error(error)
      this.ajax=false;
      return;
    }
  })
}

  hapus(item:any){
    this.Satkerini.kdsatker=item.kdsatker;
    this.setPesan = {
        "judulPesan": "Konfirmasi Hapus",
        "isiPesan": "Yakin akan menghapus Satker ini?",
        "jenisPesan": 2
    };
    setTimeout(function () {
        jQuery('#ctnpesan').modal('show');
    }, 100);

  }

  ngOnDestroy(): void {
    if(this.satkersub){
      this.satkersub.unsubscribe()
    }
    if(this.kppnsub){
      this.kppnsub.unsubscribe()
    }
      this.dtTrigger.unsubscribe();

    
  }

}
