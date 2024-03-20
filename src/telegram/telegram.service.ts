import { Injectable } from "@nestjs/common";
import * as TelegramBot from "node-telegram-bot-api";
import { ConfigService } from "../common/config.service";
import { UserService } from "../user/user.service";

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private availableCommands = [
    {
      command: /\/start/,
      description: "Запуск бота",
      action: "startCommand",
    },
  ];

  constructor(
    private config: ConfigService,
    private userService: UserService,
  ) {
    const token = config.get("TELEGRAM_TOKEN_BOT");
    this.bot = new TelegramBot(token, {
      polling: {
        autoStart: false,
      },
    });
  }

  public async launch(): Promise<void> {
    this.availableCommands.forEach((command) => {
      this.bot.onText(command.command, (msg) => {
        this[command.action](msg).catch((err) => console.error(err));
      });
    });
    await this.bot.startPolling();
  }

  private async startCommand(msg: TelegramBot.Message) {
    let user = await this.userService.getByChatId(msg.chat.id);
    if (!user) {
      user = await this.userService.create(msg.chat.id, msg.chat.first_name);
    }

    const commands = await this.bot.getMyCommands();
    if (commands.length > 0) {
      await this.bot.setMyCommands([]);
    }

    await this.bot.sendMessage(
      msg.chat.id,
      `Добро пожаловать ${user.name}! Для того что бы посмотреть что умеет бот введите комманду /help`,
    );
  }
}
