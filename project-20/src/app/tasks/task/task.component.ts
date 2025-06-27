import { Component, inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import {type Task } from './task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input({required:true}) task!: Task;
  // @Output() complete = new EventEmitter<string>();
  private taskService = inject(TasksService);

  onCompleteTask() {
    // this.complete.emit(this.task.id);
    this.taskService.removeTask(this.task.id);
  }

}
