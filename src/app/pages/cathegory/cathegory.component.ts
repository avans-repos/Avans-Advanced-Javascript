import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cathegory',
  templateUrl: './cathegory.component.html',
  styleUrls: ['./cathegory.component.scss'],
})
export class CathegoryComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
    });
  }
}
