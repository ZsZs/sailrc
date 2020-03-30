import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sailrc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sail Race Management';
  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}
