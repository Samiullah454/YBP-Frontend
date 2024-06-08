import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { DataService } from '../data.service';
import { data } from 'autoprefixer';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServicelistComponent implements OnInit {
  public contentHeader: object;
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  public selectedRole = [];
public selectedPlan = [];
public selectedStatus = [];
public searchValue = '';
public selectRole: any = [
  { name: 'All', value: '' },
  { name: 'Admin', value: 'Admin' },
  { name: 'Author', value: 'Author' },
  { name: 'Editor', value: 'Editor' },
  { name: 'Maintainer', value: 'Maintainer' },
  { name: 'Subscriber', value: 'Subscriber' }
];

public selectPlan: any = [
  { name: 'All', value: '' },
  { name: 'Basic', value: 'Basic' },
  { name: 'Company', value: 'Company' },
  { name: 'Enterprise', value: 'Enterprise' },
  { name: 'Team', value: 'Team' }
];

public selectStatus: any = [
  { name: 'All', value: '' },
  { name: 'Pending', value: 'Pending' },
  { name: 'Active', value: 'Active' },
  { name: 'Inactive', value: 'Inactive' }
];
@ViewChild('SweetAlertConfirmText') sweetAlertConfirmText;
  tempData: any;
filterUpdate(event) {
  // Reset ng-select on search
  this.selectedRole = this.selectRole[0];
  this.selectedPlan = this.selectPlan[0];
  this.selectedStatus = this.selectStatus[0];

  const val = event.target.value.toLowerCase();

  // Filter Our Data
  const temp = this.tempData.filter(function (d) {
    return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
  });

  // Update The Rows
  this.rows = temp;
  // Whenever The Filter Changes, Always Go Back To The First Page
  this.table.offset = 0;
}
@ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private dataService: DataService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Services',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Website ',
            isLink: true,
            link: '/'
          },
          {
            name: 'Service List',
            isLink: false
          }
        ]
      }
    };
     this.loadsection()
  }
  @BlockUI() sectionBlockUI: NgBlockUI;
  loadsection(): void {
    this.sectionBlockUI.start();
    this.dataService.getItems().subscribe(
      (data: any) => {
        // Extract relevant data and assign it to rows
        this.sectionBlockUI.stop();
        this.rows = data.result.items.map(item => {
          let rowData: any = {
            id: item.id,
            sectionTitle: item.sectionTitle,
            sectionType: item.sectionType,
            services: '', // Default value for services
            pricings: '' // Default value for pricings
          };
  
          if (item.sectionType == 1) {
            // Concatenate service titles
            rowData.services = item.services.map(service => service.title).join(', ');
          } else if (item.sectionType == 2) {
            // Concatenate pricing titles
            rowData.pricings = item.pricings.map(pricing => pricing.title).join(', ');
          }
  
          return rowData;
        });
      },
      (error: any) => {
        this.toastr.error('Error In Loading', 'Error');
        this.sectionBlockUI.stop();
      }
    );
  }
  
  openConfirmationDialog(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.del(id);
      }
    });
  }
  del(id){
    this.sectionBlockUI.start();
    this.dataService.deleteItem(id).subscribe(
      (data:any) =>{
        this.loadsection()
        this.toastr.success('Item created successfully', 'Success');
        this.sectionBlockUI.stop();
      },
      (error:any) =>{
       this.toastr.error('Error In Deleting','Error');
       this.sectionBlockUI.stop();
      }

    )
  }
  }


