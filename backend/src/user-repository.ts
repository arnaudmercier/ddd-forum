import {pool} from "./index";
import {User, UserResponse} from "./user";

export class UserRepository {

    save(user: User): Promise<number> {
        console.log('Saving user to database:', user);
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

    update(userId: number, user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE users 
                           SET username = $2, 
                               email = $3, 
                               first_name = $4, 
                               last_name = $5 
                           WHERE id = $1`,
                [userId, user.username, user.email, user.firstName, user.lastName],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
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

    findByEmail(email: string): Promise<UserResponse | null> {
        console.log('Finding user by email:', email);
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email],
                (error, results) => {
                    if (error) {
                        console.log('Error querying database:', error);
                        reject(error);
                        return;
                    }
                    if (results.rows.length === 0) {
                        console.log('No user found with email:', email);
                        resolve(null);
                        return;
                    }
                    const row = results.rows[0];
                    console.log('User found:', row);
                    const user: UserResponse = {
                        id: row.id,
                        email: row.email,
                        username: row.username,
                        firstName: row.first_name,
                        lastName: row.last_name
                    };

                    resolve(user);

                }
            );
        });
    }

}


