import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {checkAccount, checkResponse, account} from "../../../src/app/shared/interfaces";
import {AccountService} from "../shared/components/account.service";
import {environment} from "../../../src/environments/environment";
import {categories} from "../shared/data/categories";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],

})
export class AddAccountComponent implements OnInit {

  showOtherFields: boolean = false;
  loader: boolean = false;
  errorMessage: boolean = false;
  checkAccount: boolean = true;
  accountInformation: checkResponse;

  selectedCategories = [];
  categories = categories.category;

  wordCheck: string = `${environment.wordCheck}`;
  form: FormGroup;
  formOtherFields: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required)
    })
    this.formOtherFields = new FormGroup({
      price: new FormControl("2500", [Validators.required, Validators.min(0), Validators.max(9999999)]),
      theme: new FormControl(null, Validators.required),
      description: new FormControl("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book", [Validators.required, Validators.maxLength(1000)]),
      contact: new FormControl("aisdasdoias", [Validators.required, Validators.maxLength(200)]),
    })
  }

  submit() {
    if(this.form.invalid){
      return
    }

    this.loader = true;
    this.errorMessage = false;

    const checkAccount: checkAccount = {
      username: this.form.value.username,
    }

    this.accountService.check(checkAccount).subscribe(  (response: checkResponse) => {
      this.form.reset()
      this.loader = false;
      if (!response.added && response.fans >= 500 && response.bio.toLowerCase() != this.wordCheck.toLowerCase()){
        this.checkAccount = false;
        this.accountInformation = response;
        this.showOtherFields = true;
      }else {
        this.errorMessage = true;
      }
    });
  }

  create() {
    if(this.formOtherFields.invalid){
      return
    }

    this.loader = true;
    this.errorMessage = false;

    const createAccountDTO: account ={
      accountInfo: this.accountInformation,
      price: this.formOtherFields.value.price,
      description: this.formOtherFields.value.description,
      theme: this.selectedCategories,
      contact: this.formOtherFields.value.contact,
      date: new Date()
    }

    this.accountService.createAccount(createAccountDTO).subscribe(response => {
      this.loader = false;
      this.router.navigate(['/account'])
    },(error) => {
      console.error('error caught in component')
      this.errorMessage = true;
      this.loader = false;
    });
  }
}
