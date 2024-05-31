import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { EnvModule } from '~/app/modules/env.module';
import { EnvService } from '~/app/services/env';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        uri: `${envService.get('RABBITMQ_URL')}/pdi_collections`,
        enableControllerDiscovery: true,
        connectionInitOptions: {
          timeout: 60000,
          wait: false,
          consumer_timeout: 5400000,
        },
      }),
    }),
  ],
  exports: [RabbitMQModule],
})
export class MessagingModule {}
