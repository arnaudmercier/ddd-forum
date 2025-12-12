import {pool} from "./index";
import {User} from "./user";

export class UserRepository {

    save(user: User): Promise<string> {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO users (username, email, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [user.username, user.email, user.firstName, user.lastName, user.password],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    const userId = results.rows[0].id;
                    resolve(userId);
                })
        });
    }

    usernameExists(username: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT COUNT(1) FROM users WHERE username = $1',
                [username],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    const count = parseInt(results.rows[0].count, 10);
                    resolve(count > 0);
                }
            );
        });
    }

    emailExists(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT COUNT(1) FROM users WHERE email = $1',
                [email],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    const count = parseInt(results.rows[0].count, 10);
                    resolve(count > 0);
                }
            );
        });
    }

}


