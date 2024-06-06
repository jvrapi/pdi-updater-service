import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateNewSetAndCardsService } from '../services/sets';

@Processor({
  name: 'processSetData',
})
export class ProcessSetDataJob {
  constructor(
    private readonly createNewSetAndCardsService: CreateNewSetAndCardsService,
  ) {}

  @Process()
  async jobHandler(job: Job<{ setCode: string }>) {
    await this.createNewSetAndCardsService.execute(job.data.setCode);
  }

  @OnQueueFailed()
  async onFailed(job: Job, error: Error) {
    console.error(`Job failed with error: ${error.message}`);
  }
}
