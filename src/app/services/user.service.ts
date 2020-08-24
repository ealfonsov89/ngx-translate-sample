import { Injectable, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router} from '@angular/router'

@Injectable()
export class UserService {
  lang = 'en';  
  format: string;
  timeZone: string;
  constructor(
    private readonly translate: TranslateService
  ) {
    this.translate.onLangChange.subscribe(({lang}) => {
      this.lang = lang;
    })
  }
}