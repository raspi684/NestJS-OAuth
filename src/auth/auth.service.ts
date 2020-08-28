import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = (await this.usersService.findBy({ where: [{ email: username }], take: 1 }))[0];
        if (user && user.password === password) return user;
        return null;
    }

    async login(user: User) {
        return {
            access_token: this.jwtService.sign({
                sub: user.id,
                email: user.email
            }, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRE_TIME
            })
        }
    }
}
