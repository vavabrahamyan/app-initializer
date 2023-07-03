import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // private token = 'Bearer $M3O_API_TOKEN';
  private userNames = new BehaviorSubject(null);
  public users$ = this.userNames.asObservable().pipe(
    filter((user) => !!user)
  );

  constructor(private http: HttpClient) {}

  getUserId() {
    // const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (response) => {
        (response as Array<any>).forEach((user: any) => {
          this.userNames.next(user.name);
        })
        console.log('response::', response);
      },
      error: (error) => {
        console.log('error::', error);
      },
    });
  }
}
