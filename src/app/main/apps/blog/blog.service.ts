import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  // Method to create a new blog
  createBlog(blogData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/Blog/Create`, blogData);
  }

  // Method to retrieve a single blog by ID
  getBlogById(blogId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/blogs/${blogId}`);
  }

  // Method to update an existing blog
  updateBlog(blogId: number, blogData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/blogs/${blogId}`, blogData);
  }

  // Method to delete a blog by ID
  deleteBlog(blogId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/blogs/${blogId}`);
  }

  // Method to get all blogs
  getAllBlogs(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/blogs`);
  }
}
