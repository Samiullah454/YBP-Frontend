import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { SliderService } from '../slider.service';
import Swal from 'sweetalert2';

const URL = `${environment.apiLiveUrl}/services/app/Slider/UploadImage`;

@Component({
  selector: 'app-slideradd',
  templateUrl: './slideradd.component.html',
  styleUrls: ['./slideradd.component.scss']
})
export class SlideraddComponent implements OnInit {

  public contentHeader: object;
  title: string = '';
  description: string = '';
  focusedWord: string = '';
  image: File | null = null;
  imageUrl: any;
  submitted = false;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private toastr: ToastrService, private sliderService: SliderService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 550;
          canvas.height = 245;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          this.selectedImage = canvas.toDataURL();
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Slider',
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
            name: 'Add Slider',
            isLink: false
          }
        ]
      }
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // Check if response is parsed correctly
      try {
        response = JSON.parse(response);
      } catch (error) {
        console.error('Error parsing response JSON:', error);
        return;
      }

      // Verify if response.result contains the image URL
      this.imageUrl = response.result;
    };
  }

  addSlider(): void {
    this.submitted = true;
    // Check if imageUrl is empty
    if (!this.imageUrl) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Upload Image First'
      });
      console.error('Image URL is missing');
      return;
    }

    const body = {
      title: this.title,
      description: this.description,
      imageUrl: this.imageUrl,
      focusedWord:this.focusedWord
    };
    this.sliderService.addSlider(body).subscribe(
      response => {
        console.log(response);
        this.toastr.success('Slider added successfully.');
        // Reset form fields and file uploader queue
        this.title = '';
        this.description = '';
        this.imageUrl = null;
        this.selectedImage = null;
        this.focusedWord=null;
        this.submitted = false;
        this.uploader.clearQueue();
      },
      error => {
        console.error('Error occurred while adding slider:', error);
        // Optionally, handle errors (e.g., show error message to the user)
      }
    );
  }
}
