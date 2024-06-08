import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { BlogService } from '../blog.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
const URL = `${environment.apiLiveUrl}/services/app/Slider/UploadImage`;
@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddblogComponent implements OnInit {
  title: string;
  snowEditorRefs: any;
  
  blockquoteRefs:any; // Initialize with one editor reference
  submitted:boolean = false;
  headerImgUrl: string;
  image1Url: string;
  image2Url: string;
  facebookLink: string; // Added
  twitterLink: string; // Added
  googlePlusLink: string; // Added
  linkedInLink: string; // Added
  pinterestLink: string; // A
  constructor(private _blogservice:BlogService,private toastr:ToastrService) { }

  ngOnInit(): void { 
    
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // Check if response is parsed correctly
      try {
        response = JSON.parse(response);
      } catch (error) {
        console.error('Error parsing response JSON:', error);
        return;
      }

      // Verify if response.result contains the image URL
      this.headerImgUrl = response.result;
    };
    this.multiuploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // Check if response is parsed correctly
      try {
        response = JSON.parse(response);
        console.log("Res", response);
      } catch (error) {
        console.error('Error parsing response JSON:', error);
        return;
      }
    
      // Verify if response.result contains the image URL
      if (response.result) {
        if (!this.image1Url) {
          this.image1Url = response.result;
        } else if (!this.image2Url) {
          this.image2Url = response.result;
        } else {
          console.warn('Already two images uploaded');
        }
      } else {
        console.error('Image upload failed');
      }
    };
    
  }
  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  public multiuploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });

  saveToDatabase() {
    // Construct your object based on the collected data
    const blogData = {
      title: this.title,
      headerimgurl: this.headerImgUrl,
      blogText: this.snowEditorRefs,
      blockquote: this.blockquoteRefs,
      blogauthorId: 2,
      imageGallery: {
        image1Source: this.image1Url,
        image2Source: this.image2Url
      },
      blogBottom: { // Added
        facebookLink: this.facebookLink,
        twitterLink: this.twitterLink,
        googlePlusLink: this.googlePlusLink,
        linkedInLink: this.linkedInLink,
        pinterestLink: this.pinterestLink
      }
    };
      // Now you can send this blogData object to your backend API to save in the database
      console.log(blogData)
    this._blogservice.createBlog(blogData).subscribe(
      (data) =>{
        this.toastr.success('Item updated successfully', 'Success');
        // Handle success or navigate to another page
      },
      error => {
        this.toastr.error('Failed to update item', 'Error');
        // Handle error
      }
    )

  ;
  }
}
