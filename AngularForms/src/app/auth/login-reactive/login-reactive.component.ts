import { Component } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css'
})
export class LoginReactiveComponent {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


  onSubmit(){
    console.log(this.form.value);
    
  }
}
