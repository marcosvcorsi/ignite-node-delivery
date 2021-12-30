import { container } from 'tsyringe';

import { jwtConfig } from '@/config/jwt';
import { PrismaClientRepository } from '@/modules/clients/infra/database/prisma/client';
import { ClientRepository } from '@/modules/clients/infra/repositories/client';
import { PrismaDeliveriesRepository } from '@/modules/deliveries/infra/database/prisma/deliveries';
import { DeliveriesRepository } from '@/modules/deliveries/infra/repositories/deliveries';
import { PrismaDeliverymanRepository } from '@/modules/deliveryman/infra/database/prisma/deliveryman';
import { DeliverymanRepository } from '@/modules/deliveryman/infra/repositories/deliveryman';

import { BcryptHashProvider } from '../infra/providers/bcrypt';
import { HashProvider } from '../infra/providers/hash';
import { JwtTokenProvider } from '../infra/providers/jwt';
import { TokenProvider } from '../infra/providers/token';

container.registerSingleton<ClientRepository>(
  'ClientRepository',
  PrismaClientRepository,
);

container.registerSingleton<DeliverymanRepository>(
  'DeliverymanRepository',
  PrismaDeliverymanRepository,
);

container.registerSingleton<DeliveriesRepository>(
  'DeliveriesRepository',
  PrismaDeliveriesRepository,
);

container.registerSingleton<HashProvider>('HashProvider', BcryptHashProvider);

container.registerInstance<TokenProvider>(
  'ClientTokenProvider',
  new JwtTokenProvider(jwtConfig.clientSecret),
);

container.registerInstance<TokenProvider>(
  'DeliverymanTokenProvider',
  new JwtTokenProvider(jwtConfig.deliverymanSecret),
);
