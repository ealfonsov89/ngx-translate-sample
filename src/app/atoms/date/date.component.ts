import { Component, Output, EventEmitter, Input, OnDestroy } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { Subscribable, Subscription } from "rxjs";

@Component({
  selector: "app-at-date",
  templateUrl: "./date.component.html" 
})
export class DateComponent implements OnDestroy {
  @Input() date: Date;
  @Input() format: string;
  @Input() timeZone: string;
  @Input() lang: string;

  private langChange: Subscription;
  constructor(private readonly translate: TranslateService) {
    this.date = new Date();
    this.format = 'long';
    this.timeZone = undefined;
    this.langChange = this.translate.onLangChange.subscribe(({lang}) => {
      this.lang = lang;
    })
  }
  ngOnDestroy(): void {
    this.langChange.unsubscribe();
  }
}