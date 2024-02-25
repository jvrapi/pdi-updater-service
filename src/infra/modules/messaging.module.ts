import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get<string>('RABBITMQ_URL')}?heartbeat=45`,
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
