import { AuthService } from '@app/auth/auth.service';
import { LocalAuthGuard } from '@app/auth/local-auth.guard';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
