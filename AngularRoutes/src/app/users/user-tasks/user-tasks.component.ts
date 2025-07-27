import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit{
  
  userId = input.required<string>();
  private usersSerVice = inject(UsersService);
  private activatedRoutes = inject(ActivatedRoute);

  userName = computed(() => this.usersSerVice.users.find((u) => u.id == this.userId())?.name)
  
  ngOnInit(): void {
    console.log(this.userId());
    this.activatedRoutes.paramMap.subscribe({
      next: (params) => console.log(params.get('userId'))
    })

  }
}
