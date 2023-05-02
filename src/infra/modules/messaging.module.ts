import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CardsService',
        useFactory: () => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL],
              queue: process.env.RABBITMQ_CARDS_QUEUE,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.registerAsync([
      {
        name: 'CardsService',
        useFactory: () => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL],
              queue: process.env.RABBITMQ_CARDS_QUEUE,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
  ],
})
export class MessagingModule {}
