import {pool} from "./index";
import {User} from "./user";

export class UserRepository {

    save(user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO users (username, email, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5)',
                [user.username, user.email, user.firstName, user.lastName, user.password],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                })
        });
    }

}


