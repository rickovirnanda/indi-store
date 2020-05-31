import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomerModule } from 'src/customer/customer.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    CustomerModule,
    PassportModule,
    JwtModule.register({
      secret:'IndikInLove',
      signOptions:{expiresIn:3600}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports:[AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
