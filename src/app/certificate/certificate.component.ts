import { Component, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent  implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.showResult();
  }

  showResult() {
    // Select the elements using Angular's renderer
    const loadingResultElement = document.querySelector('.loadingresult');
    const completeNameElement = document.querySelector('#completeName');
    const otorgadoElement = document.querySelector('#otorgado');
    const thankyouPageElement = document.querySelector('.thankyou-page');
    const sectionElements = document.querySelectorAll('section');

    // Select the loadingresult element using ElementRef and set its display style to "

    if (loadingResultElement) {
      this.renderer.setStyle(loadingResultElement, 'display', 'grid');
    }

    // Retrieve values from localStorage
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    const completeName = storedFirstName && storedLastName ? `${storedFirstName} ${storedLastName}` : null;

    if (completeName) {
      if (completeNameElement) {
        completeNameElement.textContent = completeName;
      }
      if (otorgadoElement) {
        otorgadoElement.textContent = 'Otorgado a: ';
      }
    } else {
      console.log('No hay registro de esta persona');
    }

    setTimeout(() => {
      if (thankyouPageElement) {
        thankyouPageElement.classList.add('thankyou_show');
      }

      if (sectionElements) {
        sectionElements.forEach((element) => {
          element.style.display = 'none';
        });
      }
    }, 1000);
  }
}
