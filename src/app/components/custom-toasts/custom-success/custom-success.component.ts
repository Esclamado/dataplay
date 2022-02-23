import { Component } from '@angular/core';
import { Toast, ToastrService, ToastPackage, ActiveToast } from 'ngx-toastr';


@Component({
  selector: 'app-custom-success',
  templateUrl: './custom-success.component.html',
  styleUrls: ['./custom-success.component.scss'],
  preserveWhitespaces: false,
})
export class CustomSuccessComponent extends Toast {

  undoString = 'undo';

  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    //console.log('this.toastPackage.toastId', this.toastPackage.toastId);
    this.undoString = 'undid';
    this.toastrService.remove(this.toastPackage.toastId);
    this.toastPackage.triggerAction();
    //console.log('sdfsdf',event);

    return false;
  }


}


