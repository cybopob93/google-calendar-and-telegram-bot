import { Injectable } from "@nestjs/common";
import { PostToastDto } from "./dto/PostToastDto";

@Injectable()
export class ToastService {
  printObhect(param: PostToastDto): undefined {
    console.log(param);
  }
}
