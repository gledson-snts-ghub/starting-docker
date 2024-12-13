import { CreateTimeDto } from '->dtos/times.dto';
import { Time } from '->entities/times.entity';
import { User } from '->entities/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TimeService {
    constructor(
        @InjectRepository(Time)
        private readonly timeRepository: Repository<Time>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createTime(createTimeDto: CreateTimeDto): Promise<Time> {
        const { userId, date, hours_worked } = createTimeDto;

        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const time = this.timeRepository.create({
            userId,
            date,
            hours_worked,
        });

        return this.timeRepository.save(time);
    }

    async getAllTimeById(userId: number): Promise<Time[]> {
        return this.timeRepository.find({ where: { userId } });
    }

    async getAllTimes(): Promise<Time[]> {
        return this.timeRepository.find();
    }
}
