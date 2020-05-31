import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TaskI } from './task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _url :string = "http://localhost:4000/task"
  constructor(private _http : HttpClient) { }

  getTaskToDo() :Observable<TaskI[]> {
    return this._http.get<TaskI[]>(this._url)
  }

  addTask(task : TaskI) : Observable<TaskI> {
      return this._http.post<TaskI>(this._url,task);
  }

  deleteTask(_id) {
    return this._http.delete(this._url+"/" +_id);
  }

  updateTask(data) {
    return this._http.post(this._url+ "/" +  data['_id'],data);
  }
}
