import { Routes, RouterModule } from "@angular/router";
import { Component, ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { CertificateComponent } from "./certificate/certificate.component";
import { DisplayTicketComponent } from "./components/display-ticket/display-ticket.component";
import { AdminComponent } from "./components/admin/admin.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { ProductsComponent } from "./components/products/products.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { ServicessComponent } from "./components/servicess/servicess.component";

const appRoute: Routes=[
  {path: '', redirectTo: '/inicio', pathMatch:'full'},
  {path: 'inicio', component:HomeComponent},
  {path: 'tickets', component:DisplayTicketComponent},
  {path: 'tickets-software', component: AdminComponent},
  {path: 'clientes', component:ClientsComponent},
  {path: 'productos', component:ProductsComponent},
  {path: 'ordenes', component: OrdersComponent},
  {path: 'servicios', component: ServicessComponent}
]

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<any>= RouterModule.forRoot(appRoute, {useHash: false});
