import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../shared/components/account.service";
import {account, filterAndPagination, maxValues} from "../shared/interfaces";
import {Options} from "ng5-slider";
import {categories} from "../shared/data/categories";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  accounts: any[] = [];
  categories = categories.category
  aSub: Subscription
  mVSub: Subscription
  response: any;
  formFilter: FormGroup;
  filterBool: boolean;
  filterError: boolean;
  filterValue: filterAndPagination;

  numberPage: number = 1;
  pageSize: number = 8;
  stopScroll: boolean = true;

  minValuePrice: number = 0;
  maxValuePrice: number = 250;
  optionsPrice: Options = {
    floor: 0,
    ceil: 250,
    step: 50,
    animate: false
  };

  minValueFans: number = 0;
  maxValueFans: number = 250;
  optionsFans: Options = {
    floor: 0,
    ceil: 250,
    step: 100,
    animate: false
  };

  minValueHearts: number = 0;
  maxValueHearts: number = 250;
  optionsHearts: Options = {
    floor: 0,
    ceil: 250,
    step: 100,
    animate: false
  };


  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.mVSub = this.accountService.getMaxValue().subscribe( (data:maxValues)  =>{
      const optionsPrice = Object.assign({}, this.optionsPrice);
      const optionsFans = Object.assign({}, this.optionsFans);
      const optionsHearts = Object.assign({}, this.optionsHearts);
      optionsPrice.ceil = data.maxPrice;
      optionsFans.ceil = data.maxFans;
      optionsHearts.ceil = data.maxHearts;
      this.optionsPrice = optionsPrice;
      this.optionsFans = optionsFans;
      this.optionsHearts = optionsHearts;
      this.maxValuePrice = data.maxPrice
      this.maxValueFans = data.maxFans
      this.maxValueHearts = data.maxHearts
    })

    this.aSub = this.accountService.getAll().subscribe((data: account) => {
      this.response = data;
      this.response.forEach(element => {
        this.accounts.push(element);
      })
    })

    this.formFilter = new FormGroup({
      price: new FormControl([this.minValuePrice,this.maxValuePrice]),
      fans: new FormControl([this.minValueFans,this.maxValueFans]),
      hearts: new FormControl([this.minValueHearts,this.maxValueHearts]),
      category: new FormControl()
    })
  }

  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
    if (this.mVSub){
      this.aSub.unsubscribe()
    }
  }

  onScroll(){
    if (!this.filterBool){
      this.aSub = this.accountService.getAll(this.numberPage, this.pageSize).subscribe(data => {
        this.response = data;
        if (this.response.length < this.pageSize){
          this.stopScroll = false;
        }
        this.response.forEach(element => {
          this.accounts.push(element);
        })
        this.numberPage += 1;
      })
    } else {
      this.filterValue.pageSize = 8;
      this.aSub = this.accountService.getByFilter(this.filterValue).subscribe((data: account) => {
        this.response = data;
        if (this.response.length < 8){
          this.stopScroll = false;
        }
        this.response.forEach(element => {
          this.accounts.push(element);
        })
        this.filterValue.pageNo += 1;
      })
    }
  }

  filter() {
    this.filterError = false;
    const filterData: filterAndPagination = {
      pageNo: 0,
      pageSize: 8,
      price_of: this.minValuePrice != this.optionsPrice.floor ? this.minValuePrice : null,
      price_to: this.maxValuePrice != this.optionsPrice.ceil ? this.maxValuePrice : null,
      theme: this.formFilter.value.category != null ? this.formFilter.value.category.value : null,
      fans_of: this.minValueFans != this.optionsFans.floor ? this.minValueFans : null,
      fans_to: this.maxValueFans != this.optionsFans.ceil ? this.maxValueFans : null,
      hearts_of: this.minValueHearts != this.optionsHearts.floor ? this.minValueHearts : null,
      hearts_to: this.maxValueHearts != this.optionsHearts.ceil ? this.maxValueHearts : null
    }
    this.filterValue = filterData;
    this.aSub = this.accountService.getByFilter(filterData).subscribe((data: account) => {
      this.response = data;
      this.filterBool = true;
      this.accounts = [];
      this.filterValue.pageNo = 1;
      if (this.response.length == 0){
        this.filterError = true;
      }else {
        this.response.forEach(element => {
          this.accounts.push(element);
        })
      }
    })
  }

  reset() {
    this.formFilter.reset({price: [this.optionsHearts.floor, this.optionsHearts.ceil], fans: [this.optionsFans.floor, this.optionsFans.ceil], hearts: [this.optionsHearts.floor, this.optionsHearts.ceil]})
    this.minValuePrice = this.optionsPrice.floor;
    this.maxValuePrice = this.optionsPrice.ceil;
    this.minValueFans = this.optionsFans.floor;
    this.maxValueFans = this.optionsFans.ceil;
    this.minValueHearts = this.optionsHearts.floor;
    this.maxValueHearts = this.optionsHearts.ceil;
    this.formFilter.value.categories = null

    this.aSub = this.accountService.getAll().subscribe((data: account) => {
      this.response = data;
      this.accounts = [];
      this.filterBool = false;
      this.stopScroll = true;
      this.numberPage = 1;
      this.filterError = false;
      this.response.forEach(element => {
        this.accounts.push(element);
      })
    })
  }

}

