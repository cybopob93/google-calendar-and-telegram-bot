import { Injectable, Logger } from "@nestjs/common";
import amqp, { ChannelWrapper } from "amqp-connection-manager";
import { Channel } from "amqplib";
import { ConfigService } from "../common/config.service";

@Injectable()
export class TelegramProducerService {
  static QUEUE_NAME = "telegramQueue";

  private channelWrapper: ChannelWrapper;

  constructor(private config: ConfigService) {
    const connection = amqp.connect([config.get("RABBITMQ_URL")]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(TelegramProducerService.QUEUE_NAME, {
          durable: true,
        });
      },
    });
  }

  async addToTelegramQueue(mail: any) {
    try {
      Logger.log("Sent To Queue");
      await this.channelWrapper.sendToQueue(
        TelegramProducerService.QUEUE_NAME,
        Buffer.from(JSON.stringify(mail)),
        {
          persistent: true,
        },
      );
    } catch (error) {
      Logger.error("Error on sendToQueue", error);
    }
  }
}
