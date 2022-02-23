import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public dateForm: FormGroup;
  selectedItem: any;
  start: any;
  end: any
  date: any;
  
  constructor(
    public formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.formBuilders();
  }
  formBuilders(){
    this.dateForm = this.formBuilder.group({
      /* date:  [
        '',
        Validators.compose([
          Validators.required
        ])
      ] */start: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],end: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }
  save(){
    /* let fileName = this.datePipe.transform(this.dateForm.controls.date.value, 'yyyy-MM-dd');
    console.log('date', fileName); */
    let start = this.datePipe.transform(this.dateForm.controls.start.value, 'yyyy-MM-dd');
    
    let end = this.datePipe.transform(this.dateForm.controls.end.value, 'yyyy-MM-dd');
   
  }
  ChooseItem(e){
    
  }
}
