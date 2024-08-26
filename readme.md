# GraphQL module

this package allows to create a a generic GraphQL module (with GraphQL types and prisma schema). 
it uses : 
-  prisma : (version ```>=15.5```)
-  GraphQL 
-  Postgres : or any other database 

It created the following files : 
-   modules : Modules directory 
-   module : for each module, we create : 
    -   **types.gql** : The GraphQL type for the folder
    -   **queries.ts** : The Getters
    -   **mutations.ts** : The mutations functions
    -   **resolvers.ts** : The resolvers
    -   **Module.prisma** : The prisma schema

# Usage 
It's recommanded to install the package globally by running ``` npm i graphql-module -g ```
## Setting up the DB env
You need to setup the .env file aby adding the ``` DB_URL ``` string. e.g : 
```python
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
## Generate the 
then running the command : 
```
    graphql-module generate <ModuleName> -d <DIR> -n <NAME_MODULES_FOLDER>
```
if you installed it localy to the project you may add ``` npx``` before the previous command.

## Directory
this paramater is passed throw the **-d** flag or ```--dir=DIR``` it specifies where the **db.ts** file will be generated and the modules folder. The default value is **src**
## Name Module 
this paramater is passed throw the **-n** flag or ```--name=NAME``` it specifies the name of the **modules folder**. The default value is **modules**