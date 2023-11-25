import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

interface Message<T> {
  pattern: string;
  message: T;
}

@Injectable()
export class SendMessageService {
  constructor(
    @Inject('CardsService')
    private cardsService: ClientProxy,
  ) {}

  async execute<T>({ pattern, message }: Message<T>) {
    await this.cardsService.connect();
    this.cardsService.emit(pattern, message);
  }
}
