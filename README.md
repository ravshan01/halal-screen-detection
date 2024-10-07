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
    $ git remote add halal-screen-proto git@github.com:ravshan01/halal-screen-proto.git
  ```
    
  #### Subtree Control
  - Add
    ```bash
    $ git subtree add --prefix src/proto halal-screen-proto master --squash
    ``` 
  - Fetch (or use `proto:fetch:master` package script)
    ```bash
    $ git fetch halal-screen-proto master
    ```
  - Pull (or use `proto:pull:master` package script)
    ```bash
    $ git subtree pull --prefix src/proto halal-screen-proto master --squash
    ```
    ```bash
    $ :qa
    ```
     
  #### Build
  ```bash
    $ yarn run proto:build
  ```