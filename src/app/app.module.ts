import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatComponent } from './containers/chat/chat.component';
import { UsernameComponent } from './components/username/username.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormAddChatComponent } from './components/form-add-chat/form-add-chat.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    UsernameComponent,
    RegistrationComponent,
    SidebarComponent,
    NavbarComponent,
    FormAddChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
