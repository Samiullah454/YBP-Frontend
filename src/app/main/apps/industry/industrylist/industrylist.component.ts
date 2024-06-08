import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { IndustryService } from '../industry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddIndustryComponent } from '../addindustry/addindustry.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

// Other necessary imports

@Component({
  selector: 'app-industry-list',
  templateUrl: './industrylist.component.html',
  styleUrls: ['./industrylist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndustrylistComponent implements OnInit {

  public IndustryLabel: string;
  public rows: any[]=[];
  public ColumnMode = ColumnMode;
  public selectedOption = 10;
  public searchValue = '';

  constructor(private industryService: IndustryService,private modalService: NgbModal) {}

  @ViewChild(DatatableComponent) table: DatatableComponent;


  ngOnInit(): void {
  this.fetchIndustries();
  }
  edit(row: any) {

    this.openAddIndustryModal(row);
  }
  openAddIndustryModal(industry?: any) {
    const modalRef = this.modalService.open(AddIndustryComponent);
    modalRef.componentInstance.industryToEdit = industry; 

    modalRef.result.then((result) => {
      this.fetchIndustries();
    }, (reason) => {
    });
  }
  fetchIndustries(): void {
    this.sectionBlockUI.start();
    this.industryService.getIndustries().subscribe(
      (data: any) => {
        this.rows = data.result.items;
        console.log(data.result.items)
        this.sectionBlockUI.stop();
      },
      (error: any) => {
        console.error('Error fetching industries:', error);
        this.sectionBlockUI.stop();
      }
    );
  }
  deleteIndustry(row: any) {
    // Implement your logic to delete the industry
    // For example, call the delete method from your service passing the industry ID
    this.sectionBlockUI.start();
    this.industryService.deleteIndustry(row.id).subscribe(
      (response: any) => {
        // Handle success response
        console.log('Industry deleted:', response);
        // Optionally, refresh the industry list after deletion
        this.fetchIndustries();
        this.sectionBlockUI.stop();
      },
      (error: any) => {
        // Handle error response
        console.error('Error deleting industry:', error);
        this.sectionBlockUI.stop();
      }
    );
  }
  @BlockUI() sectionBlockUI: NgBlockUI;
}
