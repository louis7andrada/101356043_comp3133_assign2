// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// Import other components and modules here as needed
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// If you have routing in your app, you would also import your AppRoutingModule here:
// import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    // List other components, pipes, and directives here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AppRoutingModule, // Uncomment if you have routing
  ],
  providers: [],
  bootstrap: [AppComponent] // This should be your root component
})
export class AppModule { }
