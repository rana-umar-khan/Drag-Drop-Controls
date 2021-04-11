import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldControl } from '../Model/FieldControl';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  public getControlsData(): Observable<FieldControl[]> {
    return this.httpClient.get<FieldControl[]>(this.baseUrl + "DragDrop")
  }
  public saveControlsData(controls:FieldControl[]){
    return this.httpClient.post(this.baseUrl + "DragDrop", controls);
  }
}
