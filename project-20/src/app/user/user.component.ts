import { Component, computed, EventEmitter, Input, input, Output, output} from '@angular/core';

import { User } from './user.model';
  
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // @Input({required:true}) id!: string;
  // @Input({required: true}) avatar!:string;
  // @Input({required: true}) name!: string; 

  @Input({required:true}) user!: User;
   @Output() selectedUser = new EventEmitter();
  // selectedUser = output<string>();


  // avatar = input.required<string>();
  // name = input.required<string>();
  // imagePath = computed(() => {
  //   return "../../assets/users/" + this.avatar();
  // })

 get imagePath(){
  return "../../assets/users/" + this.user.avatar
 }

  onSelectUser(){
    this.selectedUser.emit(this.user.id)
  }

}
