import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import CreateUpdateUser from './dto/CreateUpdateUser.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findAll() {
        return this.usersRepository.find();
    }

    findOne(id: string) {
        return this.usersRepository.findOne(id);
    }

    findBy(criteria: any) {
        return this.usersRepository.find(criteria);
    }

    async store(data: CreateUpdateUser) {
        if((await this.usersRepository.findAndCount({email: data.email}))[1] > 0)
            throw new BadRequestException("User already exists");
        const user = new User();
        
        // WARNING: In this case password is stored as PLAINTEXT
        // It is only for show how it works!!!
        Object.assign(user, data);

        return this.usersRepository.save(user);
    }

    async update(id: string, data: CreateUpdateUser) {
        const user = await this.usersRepository.findOne(id);
        if(!user) throw new NotFoundException();

        // WARNING: In this case password is stored as PLAINTEXT
        // It is only for show how it works!!!
        Object.assign(user, data);

        this.usersRepository.update(id, user);
        return user;
    }

    async destroy(id: string) {
        const user = await this.usersRepository.findOne(id);
        if(!user) throw new NotFoundException();
        this.usersRepository.remove(user);
    }
}
