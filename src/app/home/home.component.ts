import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from '../services/tickets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title = 'encuesta-salsa';
  divs: any[];
  now: number;
  firstName= '';
  lastName= '';
  english= false;
  idioma='Español';
  category='';
  ticketSort: any= [];
  ticketNumber = 0;
  currentDate = new Date();
  currentTime = new Date();


  constructor(private router : Router, private ticketService: TicketsService) {
    this.divs = [];
    this.now = 0;
    this.ticketService.getTickets().subscribe(response =>{
      this.ticketSort = response.sort((a, b) => a.ticketNumber - b.ticketNumber);
      this.ticketNumber = this.ticketSort[this.ticketSort.length -1].ticketNumber
      console.log("La ultima respuesta es: ", this.ticketNumber);
    })
  }

  ngOnInit(): void {
    this.divs = Array.from(document.querySelectorAll('.show-section section'));
    this.divs.forEach((div, index) => {
      if (index !== 0) {
        div.style.display = 'none';
      }
    });
  }

  async showActiveStep() {

    const stepId = `step${this.now}`;
    const element = document.getElementById(stepId);
    if (element) {
      const fillElements = document.querySelectorAll('.step-bar .bar .fill');
      if (fillElements.length > this.now) {
        fillElements[this.now].classList.add('w-100');
      }
    } else {
      if(this.english){
        this.idioma='Inglés'
      }

      var datos: any;
        datos = {
          'language': this.idioma,
          'name': this.firstName,
          'phone': this.lastName,
          'category': this.category,
          'date': this.currentDate.toLocaleDateString(),
          'time': this.currentTime.toLocaleTimeString(),
          'attending': false,
          'ticketNumber': this.ticketNumber+1,
          'state': 'No Atendido'
        }
        const response = await this.ticketService.addTicket(datos);

        setTimeout(function () {
          location.reload()
      }, 4000);

    }

    }


  next() {
    if (this.divs[this.now]) {
      this.divs[this.now].style.display = 'none';
      this.now = (this.now + 1 < this.divs.length) ? this.now + 1 : 0;
      if (this.divs[this.now]) {
        this.divs[this.now].style.display = 'block';
      }
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
      this.showActiveStep();
    }
  }

  checkedRadio = false;

  radioValidate(stepNumber: number) {
    const elements = document.querySelectorAll(`#step${stepNumber} input[type="radio"]`);
    this.checkedRadio = Array.from(elements).some((el) => (el as HTMLInputElement).checked);
  }

  onSubmit() {
    this.radioValidate(3);
    if (this.checkedRadio) {
      // Handle error
      const errorElement = document.getElementById('error');
      if (errorElement) {
        errorElement.innerHTML = '<div class="reveal alert alert-danger">¡Debes seleccionar una respuesta!</div>';
        setTimeout(() => {
          errorElement.innerHTML = '';
        }, 3000);
      }
      this.radioValidate(3);
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
            setTimeout(()=>{
              console.log('La categoria seleccionada es: ', this.category);
              this.next();
              }, 1000);
  }

}
