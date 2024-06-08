import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndustryService } from '../industry.service';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-add-industry',
  templateUrl: './addindustry.component.html',
  styleUrls: ['./addindustry.component.scss']
})
export class AddIndustryComponent implements OnInit {
  @Input() industryToEdit: any; // Input to receive existing industry data for edit mode
  newIndustry: any = {}; // Object to hold new industry data

  constructor(private industryService: IndustryService, public activeModal: NgbActiveModal,    private _toastrService: ToastrService,) {}

  ngOnInit() {
    if (this.industryToEdit) {
      // If in edit mode, populate form fields with existing industry data
      this.newIndustry = { ...this.industryToEdit };
    }
  }

  saveIndustry() {
    if (this.industryToEdit) {
       console.log(this.industryToEdit)
      // If in edit mode, update the existing industry
      this.sectionBlockUI.start();
      this.industryService.updateIndustry(this.newIndustry).subscribe(
        (response: any) => {
          this._toastrService.success("Industry Updated Succesfully!", "Industry Updated", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('Industry updated');
          this.sectionBlockUI.stop();
        },
        (error: any) => {
          this._toastrService.error("Error updating industry",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error updating industry:', error);
          this.sectionBlockUI.stop();
        }
      );
    } else {
      // If not in edit mode, add a new industry
      this.sectionBlockUI.start();
      this.industryService.addIndustry(this.newIndustry).subscribe(
        (response: any) => {
          this._toastrService.success("Industry Saved Succesfully!", "Industry Saved", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('Industry Saved');
          this.sectionBlockUI.stop();
        },
        (error: any) => {
          this._toastrService.error("Error Saving industry",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error saving industry:', error);
          this.sectionBlockUI.stop();
        }
      );
    }
  }

  closeModal() {
    this.activeModal.dismiss('Modal closed');
  }
  @BlockUI() sectionBlockUI: NgBlockUI;
}
