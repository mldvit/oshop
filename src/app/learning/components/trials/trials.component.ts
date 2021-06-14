import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trials',
  templateUrl: './trials.component.html',
  styleUrls: ['./trials.component.sass']
})
export class TrialsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.encodingTrial();
  }




  private encodingTrial() {
    // encode only key and paramenters
    const NAME = 'dom+mouse';
    const NAME_URL_ENCODEDED = encodeURIComponent(NAME.toString());
    console.log("ml--------------urlencoded " + NAME_URL_ENCODEDED);
  }
}
