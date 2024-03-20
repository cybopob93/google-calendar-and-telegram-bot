import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { PostToastDto } from "./dto/PostToastDto";
import { ToastService } from "./toast.service";

@Controller("toast")
export class ToastController {
  constructor(private toastService: ToastService) {}

  @Get()
  gew() {
    return "toast";
  }

  @Post(":pr")
  @HttpCode(HttpStatus.NO_CONTENT)
  gew2(
    @Param("pr") pr: string,
    @Query("x", ParseIntPipe) xQ: number,
    @Body() smth: PostToastDto,
  ) {
    console.log(pr, xQ);
    return this.toastService.printObhect(smth);
  }
}
