export class User {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;

    constructor(email: string, username: string, firstName: string, lastName: string) {
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = this.createRandomPassword();
    }

    createRandomPassword(): string {
        return Math.random().toString(36).slice(-8);
    }
}

export interface UserResponse {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
}
