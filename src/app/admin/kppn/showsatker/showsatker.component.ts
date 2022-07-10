import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Satker } from '../../satker/satker';
import { SatkerService } from '../../satker/satker.service';
import { KPPN } from '../kppn';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-showsatker', // moduleId: module.id,
    templateUrl: './showsatker.component.html'

})

export class ShowSatkerComponent implements OnInit, OnDestroy {


    satkersub:Subscription;
    pilihKPPN:any;
    listSatker:Satker[];
    public ajax2:boolean;

    dtOptions: DataTables.Settings = {};
  
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<any> = new Subject<any>();


    @Input()
    set pilTampil(value: any) {
        if (value != undefined) {

            this.tampilData(value.kdkppn);


    }
}


constructor(private satkservice:SatkerService) { }

    tampilData(kdkppn:string){

        this.ajax2=true;

        this.listSatker=[];

        this.satkersub=this.satkservice.getSatkerbyKPPN(kdkppn).subscribe({
            next:(data)=>{
              this.listSatker=data;

              this.ajax2=false;
              this.dtTrigger.next(data);

      
            },
            error: (error) => {
                this.ajax2=false;
                return;
            }
          })

    }
    ngOnInit(): void {

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5
          };

    }

    ngOnDestroy() {
        if (this.satkersub) {
            this.satkersub.unsubscribe();
        }

        this.dtTrigger.unsubscribe();

    }




}