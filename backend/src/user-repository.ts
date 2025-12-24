import {User, UserResponse} from "./user";
import {PrismaClient} from '../src/generated/prisma/client';
import {PrismaPg} from "@prisma/adapter-pg";
import {Config} from "./config";

export class UserRepository {
    private prisma: PrismaClient;

    constructor(config: Config) {
        const adapter = new PrismaPg({
            connectionString: config.databaseUrl,
        });
        this.prisma = new PrismaClient({adapter});
    }

    async save(user: User): Promise<number> {
        console.log('Saving user to database:', user);
        try {
            const createdUser = await this.prisma.user.create({
                data: {
                    username: user.username,
                    email: user.email,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    password: user.password
                }
            });
            return createdUser.id;
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    }

    async update(userId: number, user: User): Promise<void> {
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    username: user.username,
                    email: user.email,
                    first_name: user.firstName,
                    last_name: user.lastName
                }
            });
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async usernameExists(username: string): Promise<boolean> {
        try {
            const count = await this.prisma.user.count({
                where: { username: username }
            });
            return count > 0;
        } catch (error) {
            console.error('Error checking username existence:', error);
            throw error;
        }
    }

    async emailExists(email: string): Promise<boolean> {
        try {
            const count = await this.prisma.user.count({
                where: { email: email }
            });
            return count > 0;
        } catch (error) {
            console.error('Error checking email existence:', error);
            throw error;
        }
    }

    async findByEmail(email: string): Promise<UserResponse | null> {
        console.log('Finding user by email:', email);
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: email }
            });

            if (!user) {
                console.log('No user found with email:', email);
                return null;
            }

            console.log('User found:', user);
            const userResponse: UserResponse = {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name
            };

            return userResponse;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

}


