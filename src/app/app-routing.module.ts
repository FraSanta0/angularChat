import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './containers/chat/chat.component';
import { FormAddChatComponent } from './components/form-add-chat/form-add-chat.component';

const routes: Routes = [
  {path: 'main', component : ChatComponent},
  {path: '', component : ChatComponent},
  {path: 'addChat', component : FormAddChatComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
