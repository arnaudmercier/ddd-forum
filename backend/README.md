# Code-First

> This is where you'll write your code-first implementation of the User Story from DDDForum. You can [see the assignment page for more details](https://www.essentialist.dev/products/the-software-essentialist/categories/2153149734/posts/2168948146).

## Postgres

### To run Postgres locally using Docker, you can use the following command:

```bash
 docker compose -f ./etc/docker-compose.yaml up 
```

### Prisma

To generate Prisma client and run migrations, use the following commands:

```bash
# Migrate the database
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
# Seed the database
npx prisma db seed
# Clean the values of the database
npx prisma migrate reset

```

## Endpoints

### new users

```bash
# 201
curl -X POST "http://localhost:3000/users/new" -H "Content-Type: application/json" -d '{ "email":"john@test.com", "username":"john.doe", "firstName":"John", "lastName":"Doe" }'
```

### edit users

```bash
# 200
curl -X POST "http://localhost:3000/users/edit/1" -H "Content-Type: application/json" -d '{ "email":"jane@test.com", "username":"jane.dode", "firstName":"Jane", "lastName":"Doe" }'
```

### find user by email

```bash
# 200
curl -X POST "http://localhost:3000/users?email=john@test.com" 
```

### find all posts sorted by creation date desc

```bash
# 200
curl -X GET "http://localhost:3000/posts" 
``` 
