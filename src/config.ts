export const SCHEMA_PATH = "prisma/schema"
export const SCHEMA_FILE_NAME = "schema.prisma"
export const DEFAULT_SCHEMA_FILE = `
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["prismaSchemaFolder"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`
;

export const DB_CONTENT = `
import { PrismaClient } from '@prisma/client';
const prismaClientSingleton = () => new PrismaClient();
declare const globalThis: { 
    prismaGlobal: ReturnType<typeof prismaClientSingleton>; 
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;`
;
