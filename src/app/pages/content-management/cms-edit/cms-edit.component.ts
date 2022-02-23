import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CmsService } from 'src/app/services/cms/cms.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service'
@Component({
  selector: 'app-cms-edit',
  templateUrl: './cms-edit.component.html',
  styleUrls: ['./cms-edit.component.scss']
})
export class CmsEditComponent implements OnInit {
  cmsData: any;
  id: any;
  requesting: any;
  content: any;
  requestingCMS : any = true;
  screenWidth : any;
  oldContent : any;
  subsSaveChanges:any;

  constructor(
    public formModule: FormsModule,
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastsService,
    private modalService: NgxSmartModalService) {
     
      ClassicEditor.defaultConfig = {
        'width': 'auto',
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'undo',
            'redo'
          ]
        },
        image: {
          toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
          ]
        },
        table: {
          contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
        },
        language: 'en'
      };

      this.initializeSub()
    }

  public Editor = ClassicEditor;
  
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
    this.getCMSData();
    this.screenWidth = window.innerWidth;
  }

  initializeSub(){
    this.subsSaveChanges = this.modalService.getModal('passwordModal').onAnyCloseEvent.subscribe(data => {
      this.getCMSData();
    });
  }

  ngOnDestroy(){
    this.subsSaveChanges ? this.subsSaveChanges.unsubscribe() : null;
  }

  getCMSData(){
    this.cmsService.getCMS(this.id).then(res =>{
      let result: any = res;
      if(result.error == 0){
        this.cmsData = result.data;
        if (this.cmsData){
          for (let data of this.cmsData) {
            this.content = data.content;
            this.oldContent = this.content;
            data.updated_by.length > 25 ? data.updated_by  = data.updated_by.substring(0, 25) + " ...": "";
          }
        }
      }
    }).finally(() => {this.requestingCMS = false;})
  }


  checkContent(){
    if (this.oldContent == this.content){
      this.toast.showWarning('Warning.', 'Nothing to be changed');
    } else{
      this.inputPass();
    }
  }

  updateCMSData(){
    this.requesting = true;
    this.cmsService.updateCMS(this.id, this.content).then(res =>{
      let result = res;
      if(result['error'] == 0){
        this.toast.showSuccess('Success.', 'CMS has been updated.');
      }
      setTimeout(()=>{
        this.requesting = false;
      }, 1000);
    })
  }

  inputPass(){
    let obj = {
      id : this.id,
      content : this.content
    }
    this.modalService.setModalData( obj, 'passwordModal');
    this.modalService.open('passwordModal');
  }

} 
