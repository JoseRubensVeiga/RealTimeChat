import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ChannelService,
  ChatClientService,
  StreamI18nService,
} from 'stream-chat-angular';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit {
  isChatReady$!: Observable<boolean>;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.streamI18nService.setTranslation();

    this.isChatReady$ = this.auth.getStreamToken().pipe(
      switchMap((token) =>
        this.chatService.init(
          environment.stream.key,
          this.auth.getCurrentUser().uid,
          token
        )
      ),
      switchMap(() =>
        this.channelService.init({
          type: 'messaging',
          members: {
            $in: [this.auth.getCurrentUser().uid],
          },
        })
      ),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
