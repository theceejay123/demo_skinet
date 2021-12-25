import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'skinet-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss'],
})
export class PagingHeaderComponent implements OnInit {
  @Input() totalPageCount: number;
  @Input() pageNumber: number;
  @Input() pageSize: number;

  constructor() {}

  ngOnInit(): void {}

  getCurrentPageResults(): string {
    var initialCount = (this.pageNumber - 1) * this.pageSize + 1;
    var total = this.pageNumber * this.pageSize;
    var currentTotal = total > this.totalPageCount ? this.totalPageCount : total;
    return `${initialCount} - ${currentTotal}`;
  }
}
