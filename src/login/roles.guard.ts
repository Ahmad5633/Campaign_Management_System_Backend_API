// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { UserRole } from '../user/user-role.enum';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private jwtService: JwtService,
//   ) {}

//   //   canActivate(context: ExecutionContext): boolean {
//   //     const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
//   //       context.getHandler(),
//   //       context.getClass(),
//   //     ]);

//   //     if (!requiredRoles) {
//   //       return true;
//   //     }

//   //     const request = context.switchToHttp().getRequest();
//   //     const user = request.user;

//   //     return requiredRoles.some((role) => user.role === role);
//   //   }
//   // }

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     return roles.some((role) => user?.roles?.includes(role));
//   }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // No roles required means access is allowed
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      return false;
    }

    return roles.some((role) => user.role.includes(role));
  }
}
