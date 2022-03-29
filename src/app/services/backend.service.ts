import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  requestBlock: boolean = false;
  requestCount: number = 0;

  rootUri = environment.rootUri;
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
    responseType: "json" as const
  }

  constructor(
    private http: HttpClient,
  ) { }

  sendSuggestion(suggestionObj: any): Observable<any> {
    return this.http.post(this.rootUri + "/suggestion", JSON.stringify(suggestionObj), this.httpOptions);
  }

  // currently unused
  getHeroFloorPrice(hero: any): Observable<any> | undefined {    
    let requestUrl = "https://market1.theforce.trade/v2/index/search?query%5BqueryToken%5D=" + hero.name + "&query%5Bissell%5D=1&query%5BresetCount%5D=0%2C10&query%5BresonanceCount%5D=0%2C10&query%5Bby%5D=asc&query%5Border%5D=price&pageNo=1&pageSize=2";

    //return this.http.get(requestUrl, this.httpOptions);
    
    return undefined;
  }

  getCardInfo(): Observable<any> {
    return this.http.get(this.rootUri + "/cardinfo", this.httpOptions);
  }
}
