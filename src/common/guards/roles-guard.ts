import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Roles } from '../enums/roles.enum';
import * as _ from 'lodash';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private roles: Roles[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user?.roles === 'SUPER_ADMIN') {
      return true;
    }

    return _.some(user.roles, (item) => _.includes(this.roles, item));
  }
}
