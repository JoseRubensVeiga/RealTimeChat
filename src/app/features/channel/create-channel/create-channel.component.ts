import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss'],
})
export class CreateChannelComponent {
  @Output()
  saved = new EventEmitter<string>();

  channelName = new FormControl('');

  constructor(private snackbar: MatSnackBar) {}

  onCreate(): void {
    if (!this.channelName.value) {
      this.snackbar.open('Por favor, insira um nome para o canal.');
      return;
    }

    this.saved.emit(this.channelName.value);

    this.channelName.reset('');
  }
}
