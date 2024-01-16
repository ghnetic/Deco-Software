import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'capacitacion-uno';
  divs: any[];
  now: number;
  firstName= '';
  lastName= '';

  constructor(private router : Router) {
    this.divs = [];
    this.now = 0;
  }

  ngOnInit(): void {
    this.divs = Array.from(document.querySelectorAll('.show-section section'));
    this.divs.forEach((div, index) => {
      if (index !== 0) {
        div.style.display = 'none';
      }
    });
  }

  certificate(){
    this.router.navigate(['/certificate']);
  }

  showActiveStep() {
    const stepId = `step${this.now}`;
    const element = document.getElementById(stepId);
    console.log(element, stepId)
    if (element) {
      const fillElements = document.querySelectorAll('.step-bar .bar .fill');
      if (fillElements.length > this.now) {
        fillElements[this.now].classList.add('w-100');
      }
    } else {
      console.log('error');
    }
  }

  next() {
    if (this.divs[this.now]) {
      this.divs[this.now].style.display = 'none';
      this.now = (this.now + 1 < this.divs.length) ? this.now + 1 : 0;
      if (this.divs[this.now]) {
        this.divs[this.now].style.display = 'block';
      }
      console.log(this.now);
      this.showActiveStep();
    }
  }

  prev() {
    if (this.divs[this.now]) {
      const prevElement = this.divs[this.now];
      prevElement.style.display = 'none';
      this.now = (this.now > 0) ? this.now - 1 : this.divs.length - 1;
      const currentElement = this.divs[this.now];
      if (currentElement) {
        currentElement.style.display = 'block';
      }
      console.log(this.now);
      this.showActiveStep();
    }
  }

  checkedRadio = false;

  radioValidate(stepNumber: number) {
    const elements = document.querySelectorAll(`#step${stepNumber} input[type="radio"]`);
    this.checkedRadio = Array.from(elements).some((el) => (el as HTMLInputElement).checked);
  }

  onSubmit() {
    this.radioValidate(5);
    if (this.checkedRadio) {
      // Handle error
      const errorElement = document.getElementById('error');
      if (errorElement) {
        errorElement.innerHTML = '<div class="reveal alert alert-danger">¡Debes seleccionar una respuesta!</div>';
        setTimeout(() => {
          errorElement.innerHTML = '';
        }, 3000);
      }
      this.radioValidate(5);
    } else {
      // Handle success
      this.showResult();
      this.showActiveStep();
      // Update the text of your button
      const submitButton = document.getElementById('sub');
      if (submitButton) {
        submitButton.innerHTML = 'Siguiente';
      }
    }
  }

  showResult() {

            localStorage.setItem("firstName", this.firstName);
            localStorage.setItem("lastName", this.lastName);
            //$('#step0 .radio-field').removeClass('bounce-left');
            //$('#step0 .radio-field').addClass('bounce-right');
            setTimeout(()=>{
              console.log('After timeout1');
              this.next();
              }, 1000);
  }

}
