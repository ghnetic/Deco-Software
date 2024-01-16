import {MatButtonModule} from '@angular/material/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { routing } from "./app.routing";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificateComponent } from './certificate/certificate.component';
import { HomeComponent } from './home/home.component';
import { FormsModule }  from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { DisplayTicketComponent } from './components/display-ticket/display-ticket.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//ANGULAR MATERIAL
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientsComponent } from './components/clients/clients.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ClientsAddComponent } from './components/clients-add/clients-add.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';
import { TicketAddComponent } from './components/ticket-add/ticket-add.component';
import { OrdersAddComponent } from './components/orders-add/orders-add.component';
import { ProductsAddDevicesComponent } from './components/products-add-devices/products-add-devices.component';
import { ServicesAddComponent } from './components/services-add/services-add.component';
import { ServicessComponent } from './components/servicess/servicess.component';
import { ProblemsAddComponent } from './components/problems-add/problems-add.component';
import { ClientDevicesAddComponent } from './components/client-devices-add/client-devices-add.component';



@NgModule({
  declarations: [
    AppComponent,
    CertificateComponent,
    HomeComponent,
    AdminComponent,
    DisplayTicketComponent,
    ClientsComponent,
    ProductsComponent,
    OrdersComponent,
    ClientsAddComponent,
    ProductsAddComponent,
    TicketAddComponent,
    OrdersAddComponent,
    ProductsAddDevicesComponent,
    ServicesAddComponent,
    ServicessComponent,
    ProblemsAddComponent,
    ClientDevicesAddComponent
  ],
  imports: [
    routing,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AsyncPipe,
    MatTableModule,
    MatDialogModule,
    MatAutocompleteModule,

    provideFirebaseApp(() => initializeApp({"projectId":"deco-tickets-software","appId":"1:730023329656:web:e5caaa8bc05ca5a002928d","storageBucket":"deco-tickets-software.appspot.com","apiKey":"AIzaSyBLpq5-t1JmYxHqQZZEOFYOXsqBwZ5J5EQ","authDomain":"deco-tickets-software.firebaseapp.com","messagingSenderId":"730023329656","measurementId":"G-WXJ72V0RSY"})),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
