import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@app/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from '@app/auth/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
