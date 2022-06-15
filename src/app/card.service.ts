import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Card } from './card';
import { CARDS } from './card-list';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};

type Jsoner = {
  [key: string]: any;
};


@Injectable({
  providedIn: 'root'
})

export class CardService {
  url = 'https://e926.net/posts.json?tags=set%3Adrate';
  idCounter:number = 0;
  constructor(private http:HttpClient) { 
  }

  getCards(): Observable<Card[]> {
    const cards = of(CARDS);
    console.log(cards);
    return cards;
  }

  getCard(id: number): Observable<Card> {
    const card = CARDS.find(h => h.id === id)!;
    return of(card);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


  public async getJSON(url: string): Promise<Observable<any>> {

    // Call the http GET
    return this.http.get<Response>(url).pipe(map(this.extractData),catchError(this.handleError)
    );
}
 
  delete(id:number){
    const dragonIndex = CARDS.findIndex(h => h.id === id)!;
    CARDS.splice(dragonIndex,1);
  }

  create(card:Card) {
    card.id = this.idCounter;
    this.idCounter++;
    CARDS.push(card);
  }
}
