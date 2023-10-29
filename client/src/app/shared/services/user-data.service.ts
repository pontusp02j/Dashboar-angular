import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { of } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // API endpoint

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    const mockData = {
      id: 1,
      name: "Pontus Pettersson",
      username: "Pontus",
      email: "pontus@bybrick.se",
      address: {
          street: "Mock Street",
          suite: "Apt. 123",
          city: "MockCity",
          zipcode: "12345-6789",
          geo: {
              lat: "12.3456",
              lng: "78.9101"
          }
      },
      phone: "+********",
      website: "mockwebsite.com",
      company: {
          name: "ByBrick",
          catchPhrase: "Mock catchphrase",
          bs: "Mock business strategy"
      }
  };

  return of(mockData);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
       map((apiUsers: any) => {
           const localUsers: IUser[] = JSON.parse(localStorage.getItem('users') || '[]');
           return [...apiUsers, ...localUsers];
       })
    );
 }
 
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          const localUsers: IUser[] = JSON.parse(localStorage.getItem('users') || '[]');
          const user = localUsers.find(u => u.id === id);
  
          if (user) {
            return of(user);
          } else {
            return throwError(`User with ID ${id} not found`);
          }
        } else {
          return throwError(error);
        }
      })
    );
  }

  addUser(user: IUser): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}