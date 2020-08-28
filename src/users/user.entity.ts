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
  googleId: string;
  
  @Column({default: null})
  @Exclude()
  facebookId: string;
}