import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from 'googleapis';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'json' })
  token: Auth.Credentials;
}
