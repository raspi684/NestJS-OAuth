import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({default: null})
  @Exclude()
  password: string;

  @Column({unique: true})
  email: string;
  
  @Column({default: null})
  @Exclude()
  google_id: string;
  
  @Column({default: null})
  @Exclude()
  facebook_id: string;
}