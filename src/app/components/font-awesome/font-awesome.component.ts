import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-font-awesome',
  templateUrl: './font-awesome.component.html',
  styleUrls: ['./font-awesome.component.scss']
})
export class FontAwesomeComponent implements OnInit {
  sampleIcon = '<i class="fas fa-eye" ></i>';
  sampleIconThemify = '<i class="ti-themify-logo" ></i>';

  constructor() { }

  ngOnInit(): void {
  }
  


}
