import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enums/roles.enum';

export const ROLES_KEY = 'SUPER_ADMIN';
export const UserRoles = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
