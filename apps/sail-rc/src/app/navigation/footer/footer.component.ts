import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sailrc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  copyrightText = 'All rights reserved 2019';

  constructor() { }

  ngOnInit() {
  }

}
