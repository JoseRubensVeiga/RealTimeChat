import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CreateChannelComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [CreateChannelComponent],
})
export class ChannelModule {}
