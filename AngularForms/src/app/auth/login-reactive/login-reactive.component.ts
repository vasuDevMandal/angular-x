import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';


function mustContainQuestionMark(control: AbstractControl){
  if(control.value.includes('?')){
    return null;
  }

  return {doesNotContainQuestionMark: true}
}
// asyn validators
function emailIsUnique(control: AbstractControl){
  if(control.value !== 'test@example.com'){
    return of(null); 
  }
  return of({notUnique: true})
}


@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css'
})
export class LoginReactiveComponent implements OnInit{
  
  form = new FormGroup({
    email: new FormControl('',{
      validators: [Validators.email,Validators.required],
      asyncValidators:[emailIsUnique]
    }),
    password: new FormControl('',[Validators.required, Validators.minLength(6),mustContainQuestionMark])
  });

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (val) => console.log(val) 
    })
  }

  onSubmit(){
    console.log(this.form);
    const enterdEmail = this.form.value.email;
    const enterdPass = this.form.value.password;
    console.log(enterdEmail, enterdPass);
  }

  get EmailIsInvalid(){
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    )
  }

  get PassowrdIsInvalid(){
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    )
  }
}
