import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
// import { NoTaskComponent } from "./tasks/no-task/no-task.component";

export const routes:Routes = [
    {
        path:"",
        // component: NoTaskComponent
        redirectTo: 'tasks',
        pathMatch:'full'
    },
    {
        path:"users/:userId",
        // component: UserTasksComponent
        loadComponent: () => import('./users/user-tasks/user-tasks.component').then( mod => mod.UserTasksComponent)
    },
    {
        path:"tasks",
        component:TasksComponent
    },
    {
        path:"**",
        component: NoTaskComponent
    }
]