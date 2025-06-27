import { Component, EventEmitter, inject, Output,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  @Input({required:true}) userId!: string;
  @Output() close = new EventEmitter<void>();
  // @Output() addNewTask = new EventEmitter<NewTask>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  private tasksService = inject(TasksService);

  onCancle(){
    this.close.emit();
  }

  onSubmit(){
    this.tasksService.addTask({
      title : this.enteredTitle,
      date: this.enteredDate,
      summary:this.enteredSummary
    },this.userId);

    this.close.emit();
  }

 
  
}
