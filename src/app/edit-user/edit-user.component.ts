import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { WebApiService } from '../service/web-api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {

  editUserForm: UserForm = new UserForm();
  @ViewChild("userForm")
  userForm!: NgForm;
  isSubmitted: boolean = false;

  userId: any;

  constructor(private route: ActivatedRoute, private router: Router, private webApiService: WebApiService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.webApiService.getUserById(this.userId).subscribe((data: any) => {
      this.editUserForm = data;
    });
  }

  updateUser(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.editUserForm.id = this.userId;
      this.webApiService.updateUser(this.editUserForm).subscribe((data: any) => {
        this.router.navigate(['Home']);
      });
    }
  }

  cancel() {
    this.router.navigate(['Home']);
  }

}

export class UserForm {
  id: string = "";
  firstname: string = "";
  lastname: string = "";
  email: string = "";
}
