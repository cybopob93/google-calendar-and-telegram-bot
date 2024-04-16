import { Module } from "@nestjs/common";
import { TelegramProducerService } from "./telegram.producer.service";
import { TelegramConsumerService } from "./telegram.consumer.service";
import { CommonModule } from "../common/common.module";

@Module({
  imports: [CommonModule],
  providers: [TelegramProducerService, TelegramConsumerService],
  exports: [TelegramProducerService],
})
export class QueueModule {}
