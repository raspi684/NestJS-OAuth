import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({default: null})
  password: string;

  @Column({unique: true})
  email: string;
  
  @Column({default: null})
  google_id: string;
  
  @Column({default: null})
  facebook_id: string;
}