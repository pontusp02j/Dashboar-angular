import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { PageEvent } from '@angular/material/paginator'; // Import this
import { IUser } from 'src/app/interfaces/IUser';
import { IAddress } from 'src/app/interfaces/IAddress';
import { ICompany } from 'src/app/interfaces/ICompany';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  filterText = '';
  newUserName = '';

  // Pagination properties
  totalUsers = 0;
  pageSize = 5; // Set default to 5 users per page
  pageSizeOptions: number[] = [5, 10, 15];
  pageIndex = 0; // Current page index

  constructor(private userDataService: UserDataService, private router: Router) { }

  ngOnInit(): void {
    this.userDataService.getUsers().subscribe(data => {
      this.users = data;
      this.totalUsers = data.length; // Update total number of users
      this.filterUsers();
    });
  }

  addUser() {

    const defaultAddress: IAddress = {
      street: '123 Default St',
      suite: 'Apt 101',
      city: 'Default City',
      zipcode: '12345',
      geo: {
        lat: '0',
        lng: '0'
      }
    };
    
    const defaultCompany: ICompany = {
      name: 'Default Co.',
      catchPhrase: 'Default catchPhrase',
      bs: 'Default bs'
    };

    const newUser: IUser = {
      id: this.users.length + 1,
      name: this.newUserName,
      username: 'defaultUsername',
      email: 'default@example.com',
      address: defaultAddress,
      phone: '123-456-7890',
      website: 'http://default.com',
      company: defaultCompany
    };
    
    this.userDataService.addUser(newUser).subscribe({
      next: response => {
          this.users.push(newUser);
          // Storing users in localStorage
          localStorage.setItem('users', JSON.stringify(this.users));
          this.totalUsers = this.users.length;
          this.filterUsers();
          this.newUserName = '';
      },
      error: error => {
          console.error("Error adding new user:", error);
      }
    });
  }

  removeUser(userId: number) {
    const index = this.users.findIndex(user => user.id === userId);
    if (index !== -1) {
        this.users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        this.totalUsers = this.users.length;
        this.filterUsers();
    }
  }

  filterUsers(): void {
    const filtered = this.users.filter(user => 
      user.name.toLowerCase().includes(this.filterText.toLowerCase())
    );

    this.filteredUsers = filtered.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
    this.totalUsers = filtered.length;
  }

  pageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.filterUsers();
  }

}
