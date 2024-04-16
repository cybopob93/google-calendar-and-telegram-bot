import { Message } from "node-telegram-bot-api";
import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import amqp, { ChannelWrapper } from "amqp-connection-manager";
import { ConfirmChannel } from "amqplib";
import { ConfigService } from "../common/config.service";
import { TelegramProducerService } from "./telegram.producer.service";

@Injectable()
export class TelegramConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(TelegramConsumerService.name);

  constructor(private config: ConfigService) {
    const connection = amqp.connect([config.get("RABBITMQ_URL")]);
    this.channelWrapper = connection.createChannel();
  }

  public async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.assertQueue(TelegramProducerService.QUEUE_NAME, {
          durable: true,
        });
        await channel.consume(
          TelegramProducerService.QUEUE_NAME,
          async (message) => {
            if (message) {
              const content: Message = JSON.parse(message.content.toString());
              this.logger.log("Received message:", content);
              channel.ack(message);
            }
          },
        );
      });
      this.logger.log("Consumer service started and listening for messages.");
    } catch (err) {
      this.logger.error("Error starting the consumer:", err);
    }
  }
}
