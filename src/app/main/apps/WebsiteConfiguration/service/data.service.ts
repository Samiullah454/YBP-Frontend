import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = `${environment.apiLiveUrl}/services/app/Services`;

  constructor(private http: HttpClient) {}

  // CRUD operations
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAll`);
  }

  getItem(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Get?=${id}`);
  }

  createItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Create`, item);
  }

  updateItem(item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Update`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Delete?id=${id}`);
  }
  // getIconsFromSvg(svgUrl: string): Observable<any> {
  //   return this.http.get(svgUrl, { responseType: 'text' }).pipe(
  //     map((svgData: string) => {
  //       return this.parseSvgData(svgData);
  //     })
  //   );
  // }

  // private parseSvgData(svgData: string): any {
  //   const icons = [];
  //   xml2js.parseString(svgData, (err, result) => {
  //     if (err) {
  //       console.error('Error parsing SVG:', err);
  //       return;
  //     }
  //     const svgs = result.svg.symbol || [];
  //     svgs.forEach(svg => {
  //       const name = svg.$.id; // Assuming id attribute contains the icon name
  //       const path = svg.path ? svg.path[0].$.d : null; // Assuming path contains the SVG path data
  //       if (name && path) {
  //         icons.push({ name, path });
  //       }
  //     });
  //   });
  //   return icons;
  // }
}
