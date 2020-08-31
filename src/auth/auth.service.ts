import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = (await this.usersService.findBy({ where: [{ email: username }] }))[0];
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

    async signInWithGoogle(data) {
        if(!data.user) throw new BadRequestException();
        
        let user = (await this.usersService.findBy({ where: [{ googleId: data.user.id }] }))[0];
        if(user) return this.login(user);

        user = (await this.usersService.findBy({ where: [{ email: data.user.email }] }))[0];
        if(user) throw new ForbiddenException('User already exists, but Google account was not connected to user\'s account')

        try {
            const newUser = new User();
            newUser.firstName = data.user.firstName;
            newUser.lastName = data.user.lastName;
            newUser.email = data.user.email;
            newUser.googleId = data.user.id;

            await this.usersService.store(newUser);
            return this.login(newUser);
        } catch(e) {
            throw new Error(e)
        }
    }
}
