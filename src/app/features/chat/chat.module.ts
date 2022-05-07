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

@NgModule({
  declarations: [ChatPageComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    TranslateModule.forChild(),
    StreamAutocompleteTextareaModule,
    StreamChatModule,
    ChannelModule,
  ],
})
export class ChatModule {}
