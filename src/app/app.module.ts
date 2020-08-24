import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { AppComponent } from "./app.component";
import { DateModule } from "./atoms/date/date.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { registerLocaleData } from "@angular/common";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
export class CustomLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  public getTranslation(iso_lang: String): Observable<any> {
    const lang = iso_lang.replace("_", "/");
    // in this case can be any url
    return this.http.get(`assets/i18n/${lang}.json`).pipe(catchError(err => {
      return this.http.get(`assets/i18n/en.json`)
    }));
  }
}
// registerLocaleData(localeFr, "fr");
@NgModule({
  declarations: [AppComponent],
  imports: [
    DateModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
