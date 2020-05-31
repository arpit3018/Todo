import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user';
import { UserService } from '../_services/user.service';
import { TaskService } from '../shared/task.service';
import { Task } from '../shared/task';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


declare const M: any;
export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  public tasklist = [];
  public completeList = [];
  public date: Date
  public addTodo = true;
  public updateTodo = false;
  public taskObj;
  public labelCheck2 = true;
  public labelCheck = false;
  public currentLabel = ""
  // = new Task("", "", this.date, "", "",[{tag : "",color: ""}]);

  options = {}

  totalLabel = new Set();
  displayLabel = [];

  constructor(private userService: UserService,private _taskService: TaskService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    M.AutoInit();
    this.loadAllUsers();

    this._taskService.getTaskToDo()
      .subscribe(data => {
        this.tasklist = data;
        this.tasklist = this.tasklist.filter(item => (item['status'] != "completed" || item['linethrough'] != "linethrough"))
        // this.tasklist = this.tasklist.filter(item => item['_id'] != data['_id'])
        this.completeList = data;
        this.completeList = this.completeList.filter(item => item['status'] != "new")

        this.tasklist.forEach(x => {
          console.log(x);
          x.label.forEach(y => {
            this.totalLabel.add(y['name'])
          });
        });
        console.log(this.totalLabel)
        this.currentLabel = "ToDo";
        this.displayLabel = this.tasklist
      });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }

  deleteUser(_id: string) {
    this.userService.delete(_id).subscribe(() => { this.loadAllUsers(); });
  }


  getToDo() {
    this.currentLabel = "ToDo";
    this.labelCheck = false
    this.labelCheck2 = true
    this.displayLabel = this.tasklist
  }

  getCompleted() {
    this.currentLabel = "Completed";
    this.labelCheck = false
    this.labelCheck2 = true
    this.displayLabel = this.completeList
  }
  labelSort(label) {
    this.currentLabel = label;
    this.labelCheck = false
    this.labelCheck2 = true
    this.displayLabel = []
    this.tasklist.forEach(item => {
      item.label.forEach(y => {
        if(y.name == label) {
          this.displayLabel.push(item);
        }
      })
    });
    // this.tasklist = this.displayLabel;
  }
  // getRandomColor() {
  //   var color = Math.floor(0x1000000 * Math.random()).toString(16);
  //   return '#' + ('000000' + color).slice(-6);
  // }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];


  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  addTaskToService(formData) {


    formData["linethrough"] = "";
    formData["label"] = this.fruits;
    this._taskService.addTask(formData)
      .subscribe(data => this.tasklist.push(data));
    M.toast({ html: 'Added a new Task!' })
  }

  deleteTask(_id) {

    M.toast({ html: 'Deleted a Task!' })
    this._taskService.deleteTask(_id)
      .subscribe(data => {
        this.tasklist = this.tasklist.filter(item => item['_id'] != _id)
        this.displayLabel = this.tasklist
        this.completeList = this.completeList.filter(item => item['_id'] != _id)
      });
  }

  changeStatus(curr, val) {

    if (val == "0") {
      curr['status'] = "new";
      curr['linethrough'] = " ";
    }
    else {
      if (curr['linethrough'] == 'linethrough') {
        val = "0";
        curr['status'] = "new";
        curr['linethrough'] = " ";
      }
      else {
        curr['linethrough'] = 'linethrough';
        curr["status"] = "completed";
      }
    }
    this._taskService.updateTask(curr)
      .subscribe(data => {
        if (val == "1") {
          this.completeList.push(data)
          // this.tasklist = this.tasklist.filter(item => item['_id'] != data['_id'])
        }
        else {
          this.tasklist = this.tasklist.filter(item => item['_id'] != data['_id'])
          data["linethrough"] = "";
          this.tasklist.push(data);
          // console.log(this.tasklist)
          this.completeList = this.completeList.filter(item => item['_id'] != data['_id'])
        }

      });
  }

  showNewFormData() {
    this.fruits = []
    this.addTodo = true;
    this.updateTodo = false;
  }

  taskDetails(obj) {
    this.addTodo = false;
    this.updateTodo = true;
    this.fruits = obj.label

    // document.addEventListener('DOMContentLoaded', function() {
    //   console.log("Hdfdsfd")
    //   var elems = document.querySelectorAll('.chips-initial');
    //   console.log(elems);
    //   var instances = M.Chips.init(elems, this.options);

    // });


    this.taskObj = new Task(obj._id, obj.task, obj.date.split("T")[0], obj.status, obj.linethrough, obj.label);
    // console.log(this.taskObj.task);
  }

  updateTask() {
    this.taskObj['label'] = this.fruits
    console.log(this.taskObj);
    this._taskService.updateTask(this.taskObj)
      .subscribe(data => {
        this.tasklist.forEach(
          item => {
            if (item['_id'] == this.taskObj['_id']) {
              item['task'] = this.taskObj['task'];
              item['date'] = this.taskObj['date'];
              item['label'] = this.taskObj['label'];
            }
          }
        );
        console.log(this.tasklist);
      });
    M.toast({ html: 'Task Updated!' })
  }

}
