import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, Subject } from 'rxjs';
import { Item } from './item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url: string = 'http://localhost:8080/api';
  private items$: Subject<Item[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.url}/items/`);
  }

  getItem(id: string): Observable<Item> {
    return this.httpClient.get<Item>(`${this.url}/items/${id}`);
  }

  createItem(item: Item): Observable<string> {
    return this.httpClient.post(`${this.url}/items`, item, { responseType: 'text'});
  }

  updateItem(item: Item): Observable<string> {
    return this.httpClient.put(`${this.url}/items/${item.id}`, item, { responseType: 'text'});
  }

  deleteItem(id: string): Observable<String> {
    return this.httpClient.delete(`${this.url}/items/${id}`, { responseType: 'text'});
  }
}
