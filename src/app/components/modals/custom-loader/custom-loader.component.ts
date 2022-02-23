import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-loader',
  templateUrl: './custom-loader.component.html',
  styleUrls: ['./custom-loader.component.scss']
})
export class CustomLoaderComponent implements OnInit {
  
  constructor() { }
  counter: any = 1;

  ngOnInit(): void {
    setInterval(() => {
      this.counter = this.counter < 3 ? this.counter + 1 : 1;
    }, 1000);
  }

}
