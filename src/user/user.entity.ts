import { Column, Entity, PrimaryColumn } from "typeorm";
import { Auth } from "googleapis";

@Entity("users")
export class User {
  @PrimaryColumn({ type: "int" })
  chatId: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", nullable: true })
  email?: string | undefined;

  @Column({ type: "json", nullable: true })
  token?: Auth.Credentials | undefined;
}
