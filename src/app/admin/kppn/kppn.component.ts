import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Pesan } from 'src/app/shared/pesan/pesan';
import { KPPN } from './kppn';
import { KppnService } from './kppn.service';
import {Subject} from 'rxjs';

declare var jQuery:any;

@Component({
  selector: 'app-kppn',
  templateUrl: './kppn.component.html',
  styleUrls: ['./kppn.component.css']
})
export class KppnComponent implements OnInit,OnDestroy {

  public listKPPN:KPPN[];
  public isiKPPN:KPPN;
  public KPPNini:KPPN;
  private kppnsub:Subscription;
  public ajax:boolean=false;
  private rekam:boolean=false;
  setPesan:Pesan;
  isDisabled:boolean=false;
  pilihan:any;

  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();



  constructor(private kppnservice:KppnService,
    private toast:ToastrService) { }

  ngOnInit(): void {

    this.isiKPPN={
      "kdkppn":"",
      "nmkppn":""
    }
    this.KPPNini={
      "kdkppn":"",
      "nmkppn":""
    }
    
    this.tampilData();
  }

  private tampilData():void{

    this.ajax=true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.kppnsub=this.kppnservice.getKPPN().subscribe({
      next:(data)=>{
        this.listKPPN=data;
        this.ajax=false;
        // Calling the DT trigger to manually render the table
        // this.dtTrigger.next(data);

      },
      error: (error) => {
        console.log(error);
        this.ajax=false;
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
       jQuery('#kdkppn').focus();
    }, 500);

}

public showSatker(pilih: KPPN): void {


  this.pilihan = {
      "kdkppn": pilih.kdkppn,
  }
  jQuery('#ctnShowSatker').modal('show');
}
public kosong(): void {
    this.isiKPPN.kdkppn = '';
    this.isiKPPN.nmkppn = '';
   
}


public editData(item: KPPN): void {


  this.isDisabled=true;

  this.isiKPPN.kdkppn = item.kdkppn;
  this.isiKPPN.nmkppn = item.nmkppn;


  this.rekam =false;
  jQuery('#ctnRekam').modal('show');

  //focus
  setTimeout(function () {
      jQuery('#nmkppn').focus();
  }, 500);
}

  saveData(){


    if(this.isiKPPN.kdkppn==''){
      this.toast.error('kode KPPN harus diisi');
      setTimeout(function () {
        jQuery('#kdkppn').focus();
     }, 500);
 
      return;
    }
    if(this.isiKPPN.nmkppn==''){
      this.toast.error('nama KPPN harus diisi');
      setTimeout(function () {
        jQuery('#nmkppn').focus();
     }, 500);
 
      return;
    }


  var nilaiSimpan = {
      "kdkppn": this.isiKPPN.kdkppn,
      "nmkppn": this.isiKPPN.nmkppn
  };

  if (this.rekam == true) {
      this.kppnservice.cekKPPN(nilaiSimpan)
          .subscribe((hasil) => {
              let nAda = hasil.length;
              if (nAda > 0) {
                this.toast.warning('Kode KPPN ini sudah ada,ganti yang lain');
                return;
              } else {

                  this.kppnservice.saveKPPN(nilaiSimpan)
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
      this.kppnservice.updateKPPN(nilaiSimpan)
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

    let paramHapus = { "kdkppn": this.KPPNini.kdkppn };

    this.kppnservice.deleteKPPN(paramHapus)
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
    this.KPPNini.kdkppn=item.kdkppn;
    this.setPesan = {
        "judulPesan": "Konfirmasi Hapus",
        "isiPesan": "Yakin akan menghapus KPPN ini?",
        "jenisPesan": 2
    };
    setTimeout(function () {
        jQuery('#ctnpesan').modal('show');
    }, 100);

  }

  ngOnDestroy(): void {
    if(this.kppnsub){
      this.kppnsub.unsubscribe()
    }
      this.dtTrigger.unsubscribe();

    
  }

}
