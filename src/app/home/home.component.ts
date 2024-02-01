import { Component, OnInit, Type } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WebApiService } from '../service/web-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})

export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  closeResult = '';
  userList: any = [];
  constructor(private router: Router, private modalService: NgbModal, private webApiService: WebApiService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  async getAllUsers() {
    this.webApiService.getUsers().subscribe((data: any) => { this.userList = data; });
  }

  AddUser() {
    this.router.navigate(['AddUser']);
  }

  deleteUserConfirmation(user: any) {
    this.modalService.open(MODALS['deleteModal']).result.then((result) => {
      this.deleteUser(user);
    },
      (reason) => { });
  }

  deleteUser(user: any) {
    this.webApiService.deleteUser(user.id).subscribe((data: any) => {
      //this.toastr.success('User Deleted Successfully', 'Success');
      this.getAllUsers();
    });
  }

}
