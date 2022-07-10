import { Component,Input,EventEmitter,Output } from '@angular/core';


@Component({
    selector: 'ajax-loading',
    templateUrl: './ajax-loading.component.html'
})
export class AjaxLoadingComponent {
  @Input() ajax:boolean;

 
}