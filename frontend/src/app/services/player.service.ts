import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl ='http://localhost:8080/player';

  constructor(private httpClient: HttpClient) { }

  getPlayers(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.httpClient.get<any>(this.apiUrl, { params });
  }

  getPlayer(id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/${id}`);
  }
}
