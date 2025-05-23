import * as bcryptjs from "bcryptjs";
import { User } from "./entities/user.entity";
import { ObjectId, Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UNIQUE_EXCEPTION_CODE } from "../utils/DBErrorCodes";
import {
    Injectable,
    ConflictException,
    NotFoundException,
    InternalServerErrorException,
} from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private readonly configService: ConfigService
    ) {}

    async FindOneById(id: ObjectId): Promise<User> {
        const user = await this.userRepo.findOne({
            where: { id },
            select: { password: false, salt: false },
        });

        if (user == null) {
            throw new NotFoundException(
                `No user with the ID "${id}" was found.`
            );
        }

        return user;
    }

    async FindOneByEmail(
        email: string,
        password: string,
        verify: boolean
    ): Promise<User> {
        const user = await this.userRepo.findOne({ where: { email } });

        if (user == null) {
            throw new NotFoundException(
                `No user with the Email "${email}" was found.`
            );
        }

        if (!verify) {
            return user;
        }

        if (await user.validatePassword(password)) {
            return user;
        }

        throw new NotFoundException("Either email or password was wrong.");
    }

    async UpdateUserPassword(id: ObjectId, newPassword: string) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (user == null) {
            throw new NotFoundException(
                `No user with the ID "${id}" was found.`
            );
        }

        const hashedPassword = await bcryptjs.hash(newPassword, user.salt);
        user.password = hashedPassword;

        await this.userRepo.save(user);
        return user;
    }

    async CreateUser(data: CreateUserDTO): Promise<User> {
        try {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(data.password, salt);

            data.password = hashedPassword;
            data.salt = salt;

            const user = await this.userRepo.save(data);
            return user;
        } catch (error) {
            if (error.code == UNIQUE_EXCEPTION_CODE) {
                throw new ConflictException(
                    `The Email "${data.email}" is taken.`
                );
            }

            throw new InternalServerErrorException();
        }
    }

    async DeleteUser(id: ObjectId) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (user == null) {
            throw new NotFoundException(
                `No user with the ID "${id}" was found.`
            );
        }

        await this.userRepo.remove(user);
    }
}
