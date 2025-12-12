export class User {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;

    constructor(email: string, username: string, firstName: string, lastName: string, password: string) {
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

}

