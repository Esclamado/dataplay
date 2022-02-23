import { Component } from '@angular/core';
import { environment } from 'src/app/lib/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'system-template-tailwind';
  constructor(
    public env : environment
  ){

    this.env.exchangeToken(). then ( res => {
      
    })
  }
}