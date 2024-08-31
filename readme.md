# GraphQL module

this package allows to create a a generic GraphQL module (with GraphQL types and prisma schema). 
it uses : 
-  prisma : (version ```>=15.5```)
-  GraphQL 
-  Postgres : or any other database 

It creates the following files : 
-   modules : Modules directory, by default it's named ```modules``` but this can be changed using the ```--name``` or ```-n``` flag  
-   module : for each module, we create : 
    -   **types.gql** : The GraphQL type for the folder
    -   **queries.ts** : The Getters
    -   **mutations.ts** : The mutations functions
    -   **resolvers.ts** : The resolvers
    -   **Module.prisma** : The prisma schema

# Usage 
It's recommanded to install the package globally by running ``` npm i -g graphql-module ```
## Setting up the DB env
You need to setup the .env file aby adding the ``` DB_URL ``` string. e.g : 
```python
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
## Generate Module
then running the command : 
```
    graphql-module generate <ModuleName> -d <DIR> -n <NAME_MODULES_FOLDER>
```
if you installed it localy to the project you run ```npx graphql-module generate ... ``` 

## Directory
this paramater is passed throw the **-d** flag or ```--dir=DIR``` it specifies where the **db.ts** file will be generated and the modules folder. The default value is **src**
## Naming the Modules folder 
this paramater is passed throw the **-n** flag or ```--name=NAME``` it specifies the name of the **modules folder**. The default value is **modules**