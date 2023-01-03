import { AuthService } from '@app/auth/auth.service';
import { LocalAuthGuard } from '@app/auth/local-auth.guard';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    schema: {
      example: {
        email: 'root@mail.com',
        password: 'admin',
      },
    },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
