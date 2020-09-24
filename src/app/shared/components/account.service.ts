import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {account, checkAccount, filterAndPagination} from "../../shared/interfaces";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
  ) {
  }

  check(checkAccount: checkAccount): Observable<any> {
    return this.http.post("http://localhost:8080/api/parse", checkAccount)
  }

  createAccount(createAccountDTO: account): Observable<any> {
    return this.http.post(`http://localhost:8080/account`, createAccountDTO)
  }

  getAll(pageNo?: number, pageSize?: number) {
    return this.http.get('http://localhost:8080/account',{params: {pageNo: pageNo ? pageNo.toString() : "0", pageSize: pageSize ? pageSize.toString() : "8"}})
  }

  getByFilter(filter: filterAndPagination) {
    return this.http.post('http://localhost:8080/account/filter', filter)
  }

  getMaxValue() {
    return this.http.get("http://localhost:8080/account/maxvalue")
  }
}

