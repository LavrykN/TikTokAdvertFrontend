import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  ngOnInit(): void {

  }
  constructor( private router : Router ) {}

  closeModal() {
    console.log("modal works!")
    this.router.navigate([{outlets: {modal: null}}]);
  }
}
