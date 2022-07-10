import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-mon',
  templateUrl: './mon.component.html',
  styleUrls: ['./mon.component.css']
})
export class MonComponent implements OnInit {

  public judul:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.judul=params.get('id')
    })
  }

}
