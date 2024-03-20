import { Module, OnModuleInit } from "@nestjs/common";
import { TelegramService } from "./telegram.service";
import { CommonModule } from "../common/common.module";
import { UserModule } from "../user/user.module";

@Module({
  providers: [TelegramService],
  imports: [CommonModule, UserModule],
})
export class TelegramModule implements OnModuleInit {
  constructor(private readonly telegramService: TelegramService) {}

  async onModuleInit() {
    await this.telegramService.launch();
    console.log("Telegramm bot started");
  }
}
