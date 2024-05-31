import { RabbitHandlerConfig } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
import { Channel, ConsumeMessage } from 'amqplib';

type QueueName = 'createSets' | 'deadLetter' | 'verifyHasUpdates';

interface QueueConfigParams {
  name: string;
  exchange: string;
  routingKey: string;
}

type QueueConfig = Record<QueueName, QueueConfigParams>;

type SubscribeConfig = Pick<
  RabbitHandlerConfig,
  | 'queue'
  | 'name'
  | 'connection'
  | 'exchange'
  | 'routingKey'
  | 'createQueueIfNotExists'
  | 'assertQueueErrorHandler'
  | 'queueOptions'
  | 'errorBehavior'
  | 'errorHandler'
  | 'allowNonJsonMessages'
  | 'usePersistentReplyTo'
>;

interface ErrorHandlerQueueConfig {
  name: string;
  loggerName: string;
}

interface CreateSubscribeConfigParams {
  queue: QueueName;
  loggerName: string;
}

export class RabbitMQConfig {
  private static defaultExchange = 'pdi_collections';

  static queues: QueueConfig = {
    deadLetter: {
      exchange: this.defaultExchange,
      name: 'dead-letter',
      routingKey: 'dl',
    },
    createSets: {
      exchange: this.defaultExchange,
      name: 'create-sets',
      routingKey: 'cs',
    },
    verifyHasUpdates: {
      exchange: this.defaultExchange,
      name: 'verify-has-updates',
      routingKey: 'vhu',
    },
  };

  public static createSubscribeConfig({
    queue,
    loggerName,
  }: CreateSubscribeConfigParams): SubscribeConfig {
    return {
      queue: this.queues[queue].name,
      exchange: this.queues[queue].exchange,
      routingKey: this.queues[queue].routingKey,
      createQueueIfNotExists: false,
      errorHandler: (channel: Channel, msg: ConsumeMessage, error: Error) =>
        this.errorHandler(channel, msg, error, {
          name: this.queues[queue].name,
          loggerName,
        }),
      queueOptions: {
        durable: true,
      },
    };
  }

  private static errorHandler(
    channel: Channel,
    msg: ConsumeMessage,
    error: Error,
    queueConfig: ErrorHandlerQueueConfig,
  ) {
    const logger = new Logger(queueConfig.loggerName);
    logger.error(`Erro ao processar mensagem da fila ${queueConfig.name}`);
    const message = JSON.parse(msg.content.toString());

    const retryCount = message.retryCount || 0;

    if (retryCount < 3) {
      logger.warn(`Reenviando mensagem para a fila ${queueConfig.name}`);
      channel.sendToQueue(
        queueConfig.name,
        Buffer.from(JSON.stringify({ ...message, retryCount: retryCount + 1 })),
      );
    } else {
      logger.warn(
        'Numero de tentativas alcançado, enviando mensagem para a DLQ',
      );
      channel.sendToQueue(
        this.queues.deadLetter.name,
        Buffer.from(
          JSON.stringify({
            error: error.message,
            payload: msg.content.toString(),
          }),
        ),
      );
    }
    channel.ack(msg);
  }
}
