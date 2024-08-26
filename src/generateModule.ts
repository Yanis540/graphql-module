import fs from 'fs-extra';
import path from 'path';
import { SCHEMA_PATH } from './config';

export function generateGraphQLModule(moduleName: string, directory: string) {
  const moduleDir = path.join(directory, moduleName);

  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }

  const files = [
    'types.gql',
    'queries.ts',
    'mutations.ts',
    'resolvers.ts',
    'schema.prisma'
  ];

  files.forEach(file => {
    const fileName= file!="schema.prisma"?file:moduleName.toLowerCase()+".prisma"
    const filePath = file!="schema.prisma"?path.join(moduleDir,fileName ):`${SCHEMA_PATH}/${fileName}`;
    fs.outputFileSync(filePath, generateTemplate(file, moduleName));
  });

  console.log(`GraphQL module '${moduleName}' generated at ${moduleDir}`);
}

function generateTemplate(file: string, moduleName: string): string {
  switch (file) {
    case 'types.gql':
      return generateGraphQlTypesTemplate(moduleName);
    case 'queries.ts':
      return generateQueriesTemplate(moduleName);
    case 'mutations.ts':
      return generateMutationsTemplate(moduleName);
    case 'resolvers.ts':
      return generateResolversTemplate(moduleName);
    // case 'schema.prisma':
    default:
      return generatePrismaTemplate(moduleName);
  }
}
function generateGraphQlTypesTemplate(moduleName:string):string {
  return`
type ${moduleName} {
  id : ID! 
  name : String!
}
  `
}


function generateQueriesTemplate(moduleName: string): string {
  return `
import { prisma } from '../../db';
export const ${moduleName}Queries = { 
  get${moduleName}s: async () => { 
    return await prisma.${moduleName.toLowerCase()}.findMany(); 
  }, 
  get${moduleName}ById: async (_: any, { id }: { id: string }) => { 
    return await prisma.${moduleName.toLowerCase()}.findUnique({ 
      where: { 
        id: id 
      } 
    }); 
  } 
};`; 
}
function generateMutationsTemplate(moduleName: string): string {
   return `
import { prisma } from '../../db';
export const ${moduleName}Mutations = { 
  create${moduleName}: async ( props : any, { input }: any) => { 
    return await prisma.${moduleName.toLowerCase()}.create({ 
      data: input 
    }); 
  }, 
  update${moduleName}: async ( props:any, { id, input }: any) => { 
    return await prisma.${moduleName.toLowerCase()}.update({ 
      where: { 
        id: id 
      }, 
      data: input 
    }); 
  }, 
  delete${moduleName}: async (_: any, { id }: any) => { 
    await prisma.${moduleName.toLowerCase()}.delete({ 
      where: { 
        id: id 
      } 
    }); 
    return true; 
  } 
};`; 
}
function generateResolversTemplate(moduleName: string): string {
    return `
import { ${moduleName}Queries } from './queries';
import { ${moduleName}Mutations } from './mutations';
export const ${moduleName}Resolvers = { 
  Query: { ...${moduleName}Queries, }, 
  Mutation: { ...${moduleName}Mutations, } 
};`; 
}

function generatePrismaTemplate(moduleName: string): string {
   return `
model ${moduleName} {
  id String @id @default(uuid()) 
}`;
} 