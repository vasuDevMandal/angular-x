import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  // private taskService: TasksService;
  // constructor(tService: TasksService){
  //   this.taskService = tService;
  // }
// shorter way of writing previous code
  constructor(private taskService: TasksService){
  }

  onAddTask(title: string, description: string) {
    this.taskService.addTask({title,description});
    this.formEl()?.nativeElement.reset();
  }
}
