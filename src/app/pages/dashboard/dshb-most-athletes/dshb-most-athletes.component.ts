import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-dshb-most-athletes',
  templateUrl: './dshb-most-athletes.component.html',
  styleUrls: ['./dshb-most-athletes.component.scss']
})
export class DshbMostAthletesComponent implements OnInit {
  @Input() sports;
  @Input() province;
  @Input() requestingSports;
  @Input() requestingProvince;
  
  constructor() { }

  ngOnInit(): void {
  }

  convertToK(str){
    return (str % 1000 == 0 ? str / 1000 : (str / 1000).toString().substring(0, 3)  )  + 'k'; 
  }
}
