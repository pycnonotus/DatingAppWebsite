import { Component, OnInit } from '@angular/core';
import { isMobile } from '../shared/websiteInfo';

@Component({
  selector: 'app-desktop-only',
  templateUrl: './desktop-only.component.html',
  styleUrls: ['./desktop-only.component.css'],
})
export class DesktopOnlyComponent implements OnInit {
  constructor() {}
  isMobile = isMobile;
  ngOnInit(): void {}
}
