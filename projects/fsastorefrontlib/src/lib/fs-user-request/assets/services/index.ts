import { UserRequestService } from './user-request/user-request.service';
import { UserRequestDataService } from './user-request-data.service';
import { UserRequestNavigationService } from './user-request/user-request-navigation.service';

export const services: any[] = [
  UserRequestService,
  UserRequestDataService,
  UserRequestNavigationService
];

export * from '../../../fs-user-request/assets/services/user-request/user-request.service';
export * from '../../../fs-user-request/assets/services/user-request/user-request-navigation.service';
export * from '../../../fs-user-request/assets/services/user-request-data.service';
