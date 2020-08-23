import { IsNotEmpty, IsEmail } from "class-validator";

export default class CreateUpdateUser {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}