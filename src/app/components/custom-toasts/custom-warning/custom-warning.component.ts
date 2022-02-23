import { Component } from '@angular/core';
import { Toast, ToastrService, ToastPackage, ActiveToast } from 'ngx-toastr';


@Component({
  selector: 'app-custom-warning',
  templateUrl: './custom-warning.component.html',
  styleUrls: ['./custom-warning.component.scss'],
  preserveWhitespaces: false,
})
export class CustomWarningComponent extends Toast {

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
    //console.log('sdfsdf', event);

    return false;
  }


}

