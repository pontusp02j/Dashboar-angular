import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit {
  user!: IUser;

  constructor(private userDataService: UserDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = +this.route.snapshot.params['id']; // Convert it to a number using the + operator
    
    if (userId) {
      this.userDataService.getUserById(userId).subscribe({
        next: data => {
          this.user = data;
        },
        error: error => {
          console.error('Error fetching user details:', error);
        }
      });
    } else {
      console.error('No userId provided');
    }
  }
   
}
