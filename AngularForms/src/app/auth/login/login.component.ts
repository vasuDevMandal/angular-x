import { afterNextRender, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private form = viewChild<NgForm>('form');
  // @ViewChild('form') form2!:NgForm
  constructor(){

    const savedForm = window.localStorage.getItem('myForm');

    if(savedForm){
      const loadedFromData = JSON.parse(savedForm);
      const savedEmail = loadedFromData.email;
      // this.form()?.controls['email'].setValue(savedEmail);
      // console.log(this.form());
      setTimeout(() => {
        this.form()?.controls['email'].setValue(savedEmail);
        // console.log(this.form());
      },1)
      
      // this.form()?.setValue({
      //   email: savedEmail,
      // })
    }

    afterNextRender(() => {
      this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => {console.log(value )
          window.localStorage.setItem("myForm", JSON.stringify( value))
        }
      })

      // this.form2.valueChanges?.subscribe({
      //   next:(val) => console.log(val)
      // })
    })

      
  }
  ngOnInit(): void {
    
    

  }
  
  onSubmit(formData:NgForm) {

    if(formData.form.invalid){
      return;
    }

    const enterdEmail = formData.form.value.email; 
    const enterdPassword = formData.form.value.password; 
    // console.log(enterdEmail, enterdPassword); 
    // console.log(formData);

    formData.form.reset();
  }
}
