import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WebApiService } from '../service/web-api.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {

  addUserForm: UserForm = new UserForm();
  @ViewChild("userForm")
  userForm!: NgForm;
  isSubmitted: boolean = false;

  constructor(private router: Router, private webApiService: WebApiService) { }

  ngOnInit(): void {
  }

  addUser(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.webApiService.createUser(this.addUserForm).subscribe((data: any) => {
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