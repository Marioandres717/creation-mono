<p align="center">
  <img alt="Wallet" src="https://images.unsplash.com/photo-1613127935401-fac57fd9b349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80">
</p>

# Quick-Start Guide

- [Quick-Start Guide](#quick-start-guide)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Docker](#docker)

## Prerequisites

1. Install [Docker](https://www.docker.com/get-started) at your local machine.

## Installation

1. Clone repo and install

```bash
git clone git@github.com:Marioandres717/creation-mono.git

cd creation-mono
npm install
```

2. Create `.env` file at the root directory (check .env.file.example for guidance)

```text
# Database
# [protocol]://[user]:[password]@[host]:[port]/[database]
DATABASE_URL=mysql://root:asd123@localhost:3306/walletdb
TOKEN_DURATION=86400000

# Frontend
NX_GRAPHQL_URI=http://localhost:3000/graphql

```

3. Open `libs/shared/types` directory and create a `.meshrc.yml` file with the following config (make sure .env file matches meshrc information)

   ```yml
   sources:
     - name: backend-sql
       handler:
         mysql:
           host: localhost
           port: 3306
           user: root
           password: asd123
           database: walletdb
   require:
     - ts-node/register/transpile-only
   ```

4. Create `constants.ts` file in `apps/backend/src/app/auth/constants.ts`

   ```javascript
   export const jwtConstants = {
     secret: 'secretKey',
   };
   ```

5. Prepare the database

   1. Turn db container on:
      Known Issues:
      Errors due to corrupted data: <br>
      (CAUTION): remove tmp folder.<br> This command removes the database data.
      This error may be due to the change from mysql to mariadb,
      so it is probably safe to run the following command because such an error
      is only triggered in the early stages of development.

      ```
      rm -rf tmp
      ```

      ```
      docker-compose up db
      ```

   2. Push initial schema to db and verify database

      ```
      npx nx run shared-models:db-push

      ### Optional ###

      docker exec -it db /bin/sh
      mysql -u root -p

      # Enter database password

      show databases;
      ```

6. Generate types based on Schema

   ```
   npm run update-all
   ```

7. Build docker containers

   ```
   cd creation-mono
   docker-compose build
   ```

8. Run Docker compose

```
docker-compose up
```

11. Open `localhost:3000/graphql` and create a new user

```
mutation createUser {
insert_User(User: {
   id: 0,
   email:  "test@tech.ca",
   password: "test12",
   username: "testuser",
   active: 1
}
){
   id,
   email,
   username,
   active
}
}
```

12. Log in using the new created user at `localhost:4200`

# Docker

A list of useful docker compose-commands

```bash
# containers status
docker-compose ps
# run application
docker-compose up
# shut down application
docker-compose down
# restart container
# docker-compose restart wallet
# you can get the name from docker-compose.yml file
docker-compose restart <compose container name>
# build application based on Dockerfile
docker-compose build
# build single container
docker-compose build <compose container name>
# running bash in container
# this command will run an isolated container
# changes here won't affect the container running
# with docker-compose up in case its available
docker-compose build <compose container> bash
# General docker commands
# docker image list
docker [image|container|volume] [list]
```
