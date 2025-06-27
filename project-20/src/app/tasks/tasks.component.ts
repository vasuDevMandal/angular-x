import { Component, Input } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required:true}) nameIn!: string;
  @Input({required:true}) userId! :string;
  isAddingTask = false;
  // not a good way, it create this service instance for this component only
  // use constructor for it
  // private tasksService = new TasksService();
  constructor(private tasksService: TasksService) {
    
  }

  get selectedUserTasks(){
    return this.tasksService.getUserTasks(this.userId);
  }
  onAddTask(){
    this.isAddingTask = true;
  }

  onCancleAddNewTask(){
    this.isAddingTask = false;
  }


  

}
