## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation
```bash
$ corepack enable
```
```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


### Proto
- Репозиторий halal-screen-proto содержит `.proto` файлы
- Репозиторий halal-screen-proto подключён в этот проект с использованием git subtree.  
- Репозиторий halal-screen-proto добавлен как удалённый репозиторий в этом проекте с таким же названием  
  Выполнено командой:
  ```bash
    $ git remote add halal-screen-proto path_to_repository
  ```

  - Subtree control
     - Add subtree
       ```bash
       $ git subtree add --prefix src/proto halal-screen-proto master --squash
       ``` 
     - Fetch subtree
       ```bash
       $ git fetch halal-screen-proto master
       ```
     - Pull subtree
       ```bash
       $ git subtree pull --prefix src/proto halal-screen-proto master --squash
       ```
       ```bash
       $ :qa
       ```