import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserTokens(code: string): Observable<any> {
    return this.http.get(`https://bs-loadbalance-1072678543.af-south-1.elb.amazonaws.com:8081/v1/token?sub=${code}`)
  }
}
