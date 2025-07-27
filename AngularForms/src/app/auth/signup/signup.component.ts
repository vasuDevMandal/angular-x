import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {


  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next:(val) => console.log(val)
    })
  }

  onSubmit() {
    console.log(this.form);
  }
  onReset(){
    this.form.reset();
  }
  
}
