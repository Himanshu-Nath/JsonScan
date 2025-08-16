import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/json/';

  formatJson(rawJson: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<any>(this.apiUrl + 'format', rawJson, { headers });
  }

  jsonToXml(rawJson: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<any>(this.apiUrl + 'to-xml', rawJson, { headers });
  }
}
