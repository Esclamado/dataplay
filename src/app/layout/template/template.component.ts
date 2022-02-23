import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout/layout.service';
import { TransformDatePipe } from 'src/app/pipes/transform-date/transform-date.pipe';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  expanded = true;
  constructor(
    private layout: LayoutService
  ) { 
    this.layout.expanded.subscribe( res => {
      this.expanded = res;
    })
  }

  ngOnInit(): void {
  }

}
