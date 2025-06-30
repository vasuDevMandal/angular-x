import { ChangeDetectionStrategy, Component, inject, NgZone, OnInit, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit {

  private tasksService = inject(TasksService);
  private zone = inject(NgZone);

  selectedFilter = signal<string>('all');
  tasks = this.tasksService.allTasks;

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }

  ngOnInit(): void {
    
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('outside angular executed...zoneless');
      },4000);
    })
      
  }
  



}
