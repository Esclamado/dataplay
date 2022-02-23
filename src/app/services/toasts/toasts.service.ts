import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomErrorComponent as error } from 'src/app/components/custom-toasts/custom-error/custom-error.component';
import { CustomSuccessComponent as success } from 'src/app/components/custom-toasts/custom-success/custom-success.component';
import { CustomWarningComponent as warning } from 'src/app/components/custom-toasts/custom-warning/custom-warning.component';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  constructor(
    private toastr: ToastrService
  ) { }

  showSuccess(title = 'Success', message) {
    let options = {
      toastComponent: success
    }
    this.toastr.success(message, title, options);
  }

  showError(title = 'Error', message) {
    let options = {
      toastComponent: error
    }
    return this.toastr.error(message, title, options);
  }

  showWarning(title = 'Warning', message) {
    let options = {
      toastComponent: warning
    }
    return this.toastr.warning(message, title, options);
  }

  // showInfo(title = 'Info', message, opt = null) {
  //   var options = {
  //     toastComponent: info
  //   }
  //   if (opt) {
  //     options = { ...opt, ...options }
  //   }
  //   console.log('new obj', options)
  //   return this.toastr.warning(message, title, options);
  // }
}
