import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-preview',
  templateUrl: './link-preview.component.html',
  styleUrls: ['./link-preview.component.scss']
})
export class LinkPreviewComponent implements OnInit {
  @Input() metadata;

  constructor() { }

  ngOnInit(): void {
  }

}
