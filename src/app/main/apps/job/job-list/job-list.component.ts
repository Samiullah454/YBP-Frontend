import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { JobService } from '../job.service';
import { JobAddComponent } from '../job-add/job-add.component';
import { TechnicianService } from '../../technician/technician.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class JobListComponent implements OnInit {
  public selectedOption = 10;
  public searchValue = '';
  public rows: any[]=
  [
    {
      "Job Title": "Promote Our New Product on Instagram",
      "Description": "Share our new product launch on your Instagram profile. Include a caption and tag our official account.",
      "Image": "ProductImage.jpg",
      "Priority": "High",
      "Status": "Open",
      "Video": "ProductVideo.mp4",
      "Vendor Info": "ABC Corp, info@abccorp.com",
      "Reward (PKR)": 500,
      "Starting Reward": 500,
      "Completion Proofs": "Screenshot of the Instagram post.",
      "Stallion Comments": "Excited to promote this!",
      "Assignee": null,
      "Target Audience Level": "Newbie",
      "Number of Stallions Required": 5,
      "Task Category": "Social Media",
      "Target Stallion Skills": ["Social Media Marketing", "Content Creation"],
      "Estimated Duration": "1 day",
      "Marketing Related": true,
      "Target Audience": {
        "Age": "18-30",
        "Gender": "Any",
        "Area": "Karachi"
      },
      "Social Media Channels": ["Instagram"],
      "Expected Output Result": "Increase in product visibility and engagement on Instagram."
    },
    {
      "Job Title": "Write a Blog Post About Sustainable Living",
      "Description": "Create a 1000-word blog post on sustainable living tips.",
      "Image": "SustainableLiving.jpg",
      "Priority": "Medium",
      "Status": "Open",
      "Video": "SustainabilityTips.mp4",
      "Vendor Info": "Green Earth Initiative, contact@greenearth.com",
      "Reward (PKR)": 1000,
      "Starting Reward": 1000,
      "Completion Proofs": "Link to the published blog post.",
      "Stallion Comments": "Looking forward to writing about this important topic.",
      "Assignee": null,
      "Target Audience Level": "Newbie",
      "Number of Stallions Required": 2,
      "Task Category": "Content Writing",
      "Target Stallion Skills": ["Writing", "SEO"],
      "Estimated Duration": "3 days",
      "Marketing Related": false,
      "Target Audience": {
        "Profession": "Bloggers",
        "Area": "Lahore"
      },
      "Social Media Channels": [],
      "Expected Output Result": "Publish a high-quality blog post to attract readers."
    },
    {
      "Job Title": "Distribute Flyers for Local Event",
      "Description": "Hand out flyers for our upcoming community event in designated areas.",
      "Image": "EventFlyer.jpg",
      "Priority": "Low",
      "Status": "Open",
      "Video": "EventPromo.mp4",
      "Vendor Info": "Community Center, info@communitycenter.com",
      "Reward (PKR)": 300,
      "Starting Reward": 300,
      "Completion Proofs": "Photos of flyers being distributed.",
      "Stallion Comments": "Ready to spread the word!",
      "Assignee": null,
      "Target Audience Level": "Newbie",
      "Number of Stallions Required": 3,
      "Task Category": "Field Work",
      "Target Stallion Skills": ["Communication", "Promotion"],
      "Estimated Duration": "1 day",
      "Marketing Related": true,
      "Target Audience": {
        "Age": "Any",
        "Gender": "Any",
        "Area": "Islamabad"
      },
      "Social Media Channels": [],
      "Expected Output Result": "Increase in event attendance."
    },
    {
      "Job Title": "Take Professional Photos of Our New Collection",
      "Description": "Capture high-quality photos of our new clothing collection.",
      "Image": "SamplePhoto.jpg",
      "Priority": "High",
      "Status": "Open",
      "Video": "PhotoGuide.mp4",
      "Vendor Info": "Fashion Hub, contact@fashionhub.com",
      "Reward (PKR)": 1500,
      "Starting Reward": 1500,
      "Completion Proofs": "Upload the final edited photos.",
      "Stallion Comments": "Excited to showcase my photography skills.",
      "Assignee": null,
      "Target Audience Level": "Newbie",
      "Number of Stallions Required": 1,
      "Task Category": "Photography",
      "Target Stallion Skills": ["Photography", "Editing"],
      "Estimated Duration": "2 days",
      "Marketing Related": false,
      "Target Audience": {
        "Profession": "Photographers",
        "Area": "Karachi"
      },
      "Social Media Channels": [],
      "Expected Output Result": "High-quality product images for marketing purposes."
    },
    {
      "Job Title": "Record a Testimonial Video for Our Service",
      "Description": "Record a short testimonial video sharing your experience with our service.",
      "Image": "Testimonial.jpg",
      "Priority": "Medium",
      "Status": "Open",
      "Video": "TestimonialExample.mp4",
      "Vendor Info": "Service Plus, support@serviceplus.com",
      "Reward (PKR)": 800,
      "Starting Reward": 800,
      "Completion Proofs": "Upload the testimonial video.",
      "Stallion Comments": "Happy to share my positive experience.",
      "Assignee": null,
      "Target Audience Level": "Newbie",
      "Number of Stallions Required": 4,
      "Task Category": "Video Production",
      "Target Stallion Skills": ["Video Recording", "Presentation"],
      "Estimated Duration": "1 day",
      "Marketing Related": true,
      "Target Audience": {
        "Age": "25-45",
        "Gender": "Any",
        "Area": "Lahore"
      },
      "Social Media Channels": ["YouTube", "Facebook"],
      "Expected Output Result": "Generate positive testimonials for marketing use."
    }
  ]
  ;
  public ColumnMode = ColumnMode;
  options = [ ];
  technicianName:string;
  technicians: any [] = [];
  technicianJob:any []=[];
  constructor(private _jobService: JobService,   private _technicianService:TechnicianService,private modalService: NgbModal) { }
  @ViewChild(DatatableComponent) table: DatatableComponent;
  jobtypes: any[] = [] ;
  ngOnInit(): void {
  
    
    
  }
  edit(row: any) {

    this.openAddJobModal(row);
  }
  openAddJobModal(Job?: any) {
    const modalRef = this.modalService.open(JobAddComponent,{
      centered: true,
      size: 'xl' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
    modalRef.componentInstance.JobToEdit = Job; 
    modalRef.componentInstance.options = this.options;
    modalRef.componentInstance.technicians = this.technicians;
    modalRef.result.then((result) => {
      debugger
      this.fetchJobs();
    }, (reason) => {
    });
  }

  fetchTechnician():void{
    
    this._technicianService.getAllTechnicians().subscribe(
      (data: any) => {
        
        this.technicians = data.result.items

       
      },
      (error: any) => {
        console.error('Error fetching JobTypes:', error);
      }
    );
  }
  fetchchecklist():void{
    debugger
    this._jobService.getAllChecklist().subscribe(
      (data: any) => {
        debugger
        this.options = data.result.items
       console.log(this.options)
      },
      (error: any) => {
        console.error('Error fetching JobTypes:', error);
      }
    );
  }
  getjobtypes(){
    this._jobService.getAllJobTypes().subscribe(
      (data: any) => {
       this.jobtypes = data.result.items
        console.log(this.rows)
      },
      (error: any) => {
        console.error('Error fetching job types:', error);
      }
    );
  }
  getTypeName(number: number): string {
    const foundType = this.jobtypes.find(type => type.id === number);

    return foundType ? foundType.name : 'Unknown';
  }
  fetchJobs(): void {
    debugger;
    this._jobService.getAllJobs().subscribe(
      (data: any) => {
        this.rows = data.result.items;
        console.log(this.rows);
        debugger;
  
        // Iterate over each item in rows
        for (const row of this.rows) {
          // Check if technicianJob property exists on the current row
          if (row.technicianJob && row.technicianJob.length > 0) {
            const technicianIds = row.technicianJob.map(job => job.technicianId);
  
            // Find the corresponding technicians
            const matchingTechnicians = this.technicians.filter(tech => technicianIds.includes(tech.id));
  
            // Retrieve the names of the technicians
            this.technicianName = matchingTechnicians.length > 0
              ? matchingTechnicians.map(tech => tech.technicianName).join(', ')
              : 'No  Technician';
            console.log(this.technicianName);
          } else {
            // Handle the case where technicianJob property is not present on the row
            this.technicianName = 'No Technician ';
          }
        }
      },
      (error: any) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }
  
  
  ConfirmTextOpen(id) {
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
      if (result.value) {
         this.deleteJob(id);
      }
    });
  }
  deleteJob(id: any) {
    // Implement your logic to delete the industry
    // For example, call the delete method from your service passing the industry ID
    this._jobService.DeleteJob(id).subscribe(
      (response: any) => {
        // Handle success response
        console.log('Industry deleted:', response);
        // Optionally, refresh the industry list after deletion
        this.fetchJobs();
      },
      (error: any) => {
        // Handle error response
        console.error('Error deleting industry:', error);
      }
    );
}}
