import { Component, Inject } from '@angular/core';
import { Toast, ToastrService, ToastPackage, ActiveToast } from 'ngx-toastr';


@Component({
  selector: 'app-custom-error',
  templateUrl: './custom-error.component.html',
  styleUrls: ['./custom-error.component.scss'],
  preserveWhitespaces: false,
})
export class CustomErrorComponent extends Toast {

  undoString = 'undo';

  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
    // @Inject(String) public active: ActiveToast<any>
  ) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    //console.log('this.toastPackage.toastId', this.toastPackage.toastId);
    this.toastrService.remove(this.toastPackage.toastId);
    this.undoString = 'undid';
    this.toastPackage.triggerAction();
    //console.log('sdfsdf', event);

    return false;
  }


}