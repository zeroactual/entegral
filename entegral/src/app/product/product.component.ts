import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {DataService} from "../data.service";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product;
  destroy$: Subject<boolean> = new Subject<boolean>();
  params;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => console.log(params));
  }

  ngOnInit() {

    this.dataService.getProduct(this.route.params).pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      console.log(data);
      this.product = data;
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
