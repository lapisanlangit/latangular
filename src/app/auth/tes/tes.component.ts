import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tes',
  templateUrl: './tes.component.html',
})
export class TesComponent implements OnInit {

    dtOptions: DataTables.Settings = {};
    // persons: Person[] = [];
  
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<any> = new Subject<any>();
  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 2
      };
      this.dtTrigger.next({});

  }

}
