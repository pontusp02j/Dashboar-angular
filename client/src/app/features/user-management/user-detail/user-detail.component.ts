import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/shared/services/user-data.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: any; // Define the user property

  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
        const userId = +id;
        this.userDataService.getUserById(userId).subscribe(user => {
            this.user = user;
        });
    } else {
      return;
    }
  }
}
