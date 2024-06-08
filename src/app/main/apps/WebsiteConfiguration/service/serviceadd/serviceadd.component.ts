import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-serviceadd',
  templateUrl: './serviceadd.component.html',
  styleUrls: ['./serviceadd.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceaddComponent implements OnInit {
  sectionDetails = {
    id:0 ,
    sectionTitle: '',
    sectionDescription: '',
    sectionType: 1,
    isVisble:''
  };

  services: {id:number ,iconClass: string, title: string, description: string }[] = [];
  features: {id:number ,iconClass: string, title: string, description: string }[] = [];
  scheduleItems:{id:number ,title: string,subtitle: string,  description: string }[] = [];
  factAndFigures:{ id: number, project: string,developer: string,client: string,experince: string}[]=[];
  pricingDetails : {
    id:number ,
    iconClass: string,
    title: string,
    price: number,
    items: [{id:number ,title:string,iconClass:string}]
  }[]=[];

  icofontIcons = [
    { id: 1, class: 'icofont icofont-briefcase' },
    { id: 2, class: 'icofont icofont-server' },
    { id: 3, class: 'icofont icofont-laptop-alt' },
    { id: 4, class: 'icofont icofont-support' },
    { id: 5, class: 'icofont icofont-chart-growth' },
    { id: 6, class: 'icofont icofont-ui-calendar' }
  ];

  pricingIcons = [
    { id: 1, class: 'icofont icofont-laptop' },
    { id: 2, class: 'icofont icofont-brand-android-robot' },
    { id: 3, class: 'icofont icofont-monitor' }
  ];

  itemIcons = [
    { id: 1, class: 'icofont icofont-ui-check' },
    { id: 2, class: 'icofont icofont-ui-close' },
  ];
  sectionTypes: { id: number, value: string }[] = [
    { id: 1, value: 'Service' },
    { id: 2, value: 'Pricing' },
    { id: 3, value: 'Feature' },
    { id: 4, value: 'Availability' },
    { id: 5, value: 'Facts And Figures' },
    { id: 6, value: 'Blog' },



  ];
  @BlockUI() sectionBlockUI: NgBlockUI;
  constructor(
    private dataService: DataService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Extract id from URL
      if (id) {
       this.loadsection(id)
      }
    });
    this.addService();
    this.addPricing();
    this.addFeature();
    this.addscheduleItem();
    this.addfactandfigrue();
  }
  loadsection(id){
    this.sectionBlockUI.start();
    this.dataService.getItems().subscribe(
      (data: any) => {
        debugger
      // Extract relevant data() and assign it to rows
      this.sectionBlockUI.stop();
      const res=data.result.items.filter(item =>item.id==id)
      this.populateObjects(res);
    },
    (error:any)=>{
      this.toastr.error('Error In Loading','Error');
      this.sectionBlockUI.stop();
    });
  }
  populateObjects(data: any[]): void {
    debugger
    data.forEach((item: any) => {
      // Populate your objects based on each item in the array
       this.sectionDetails = {
        id:item.id,
        sectionTitle: item.sectionTitle,
        sectionDescription: item.sectionDescription,
        sectionType: parseInt(item.sectionType),
        isVisble: item.isVisble
      };
  
      if (item.sectionType == 1) {
        // Populate services
         this.services = item.services?.map((service: any) => ({
          id: service.id,
          iconClass: service.iconClass,
          title: service.title,
          description: service.description
        }));
        
        // Do something with the services array
      } else if (item.sectionType == 2) {
        // Populate pricings
         this.pricingDetails = item.pricings?.map((pricing: any) => ({
          id: pricing.id,
          iconClass: pricing.iconClass,
          title: pricing.title,
          price: pricing.price,
          items: pricing.items.map((item: any) => ({
            id: item.id,
            iconClass: item.iconClass,
            title: item.title
          }))
        }));
  
        // Do something with the pricingDetails array
      }
       else if (item.sectionType == 3) {
        // Populate services
         this.features = item.features?.map((feature: any) => ({
          id: feature.id,
          iconClass: feature.iconClass,
          title: feature.title,
          description: feature.description
        }));
        
        // Do something with the services array
      }else if (item.sectionType == 4) {
        // Populate services
         this.scheduleItems = item.scheduleItems?.map((scheduleItem: any) => ({
          id: scheduleItem.id,
          subtitle: scheduleItem.subtitle,
          title: scheduleItem.title,
          description: scheduleItem.description
        }));
        
        // Do something with the services array
      }
      else if (item.sectionType == 5) {
        // Populate services
         this.factAndFigures = item.factAndFigures?.map((factAndFigure: any) => ({
          id: factAndFigure.id,
          project: factAndFigure.project,
          developer: factAndFigure.developer,
          client: factAndFigure.client,
          experince:factAndFigure.experince
        }));
        
        // Do something with the services array
      }
    });
  }
  
  onSubmit(): void {
    const businessSection = {
      id: this.sectionDetails.id,
      sectionTitle: this.sectionDetails.sectionTitle,
      sectionDescription: this.sectionDetails.sectionDescription,
      sectionType: this.sectionDetails.sectionType,
      isVisible: this.sectionDetails.isVisble,
      services: [],
      pricings: [],
      features: [],
      scheduleItems:[],
      factAndFigures:[],
    };
  
    if (this.sectionDetails.sectionType === 1) {
      businessSection.services = this.services.map(service => ({
        id: service.id,
        iconClass: service.iconClass,
        title: service.title,
        description: service.description
      }));
    }
     else if (this.sectionDetails.sectionType === 2) {
      businessSection.pricings = this.pricingDetails.map(pricing => ({
        id: pricing.id,
        iconClass: pricing.iconClass,
        title: pricing.title,
        price: pricing.price,
        items: pricing.items.map(item => ({
          id: item.id,
          iconClass: item.iconClass,
          title: item.title
        }))
      }));
    }else  if (this.sectionDetails.sectionType === 3) {
      businessSection.features = this.features.map(feature => ({
        id: feature.id,
        iconClass: feature.iconClass,
        title: feature.title,
        description: feature.description
      }));
    }
    else  if (this.sectionDetails.sectionType === 4) {
      businessSection.scheduleItems = this.scheduleItems.map(scheduleItem => ({
        id: scheduleItem.id,
        subtitle: scheduleItem.subtitle,
        title: scheduleItem.title,
        description: scheduleItem.description
      }));
    }
    else  if (this.sectionDetails.sectionType === 5) {
      businessSection.factAndFigures = this.factAndFigures.map((factAndFigure: any) => ({
        id: factAndFigure.id,
        project: factAndFigure.project,
        developer: factAndFigure.developer,
        client: factAndFigure.client,
        experince:factAndFigure.experince
      }));
    }
     console.log("Data",businessSection)
    if (businessSection.id > 0) {
      // Update existing item
      this.dataService.updateItem(businessSection).subscribe(
        () => {
          this.toastr.success('Item updated successfully', 'Success');
          // Handle success or navigate to another page
        },
        error => {
          this.toastr.error('Failed to update item', 'Error');
          // Handle error
        }
      );
    } else {
      // Create new item
      this.dataService.createItem(businessSection).subscribe(
        () => {
          this.toastr.success('Item created successfully', 'Success');
          // Handle success or navigate to another page
        },
        error => {
          this.toastr.error('Failed to create item', 'Error');
          // Handle error
        }
      );
    }
  }
  
  addService(): void {
    this.services.push({id:0 , title: '', iconClass: '', description: '' });
  }
  addFeature(): void {
    this.features.push({id:0 , title: '', iconClass: '', description: '' });
  }
  addscheduleItem(): void {
    this.scheduleItems.push({id:0 , title: '', subtitle: '', description: '' });
  }
  addfactandfigrue(): void {
    this.factAndFigures.push({id: 0, project: '',developer: '',client: '',experince: ''});
  }
  delscheduleItem(index: number): void {
    this.scheduleItems.splice(index, 1);
  }
  deleteFeature(index: number): void {
    this.features.splice(index, 1);
  }
  deleteService(index: number): void {
    this.services.splice(index, 1);
  }
  
  addPricing() {
    this.pricingDetails.push({ 
      id:0,
      iconClass: '', 
      title: '', 
      price: 0, 
      items: [{ id:0,title: '', iconClass: '' }] 
    });
  }
  
  
  deletePricing(index: number) {
    this.pricingDetails.splice(index, 1);
  }
  
  addItem(pricing: any) {
    pricing.items.push({ title: '', iconClass: '' });
  }
  
  removeItem(pricing: any, index: number) {
    pricing.items.splice(index, 1);
  }
  
  closeModal(): void {
    this.activeModal.dismiss('Modal closed');
  }
}
