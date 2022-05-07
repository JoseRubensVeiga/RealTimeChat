import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormContainerComponent } from './form-container/form-container.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [FormContainerComponent, SignInComponent, SignUpComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
