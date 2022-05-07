import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  StreamAutocompleteTextareaModule,
  StreamChatModule,
} from 'stream-chat-angular';
import { ChannelModule } from '../channel/channel.module';
import { InviteButtonComponent } from './invite-button/invite-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatPageComponent, InviteButtonComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    TranslateModule.forChild(),
    StreamAutocompleteTextareaModule,
    StreamChatModule,
    ChannelModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class ChatModule {}
