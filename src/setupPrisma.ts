import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { DB_CONTENT, DEFAULT_SCHEMA_FILE, SCHEMA_FILE_NAME, SCHEMA_PATH } from './config';



function isPackageInstalled(packageName: string): boolean {
    // Get the path to the package.json file
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    
    // Check if package.json exists
    if (!fs.existsSync(packageJsonPath)) {
        console.error('package.json not found');
        return false;
    }

    // Read the package.json file
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');

    // Parse the JSON content
    const packageJson = JSON.parse(packageJsonContent);

    // Check if the package is in dependencies or devDependencies
    const isInDependencies = packageJson.dependencies && packageJson.dependencies[packageName];
    const isInDevDependencies = packageJson.devDependencies && packageJson.devDependencies[packageName];

    return Boolean(isInDependencies || isInDevDependencies);
}
export function setupPrisma(dir:string) {
    // Check if Prisma is installed
    const packageName = 'prisma';
    if (isPackageInstalled(packageName)) {
        console.log('Prisma is already installed.');
    } 
    else {
        console.log('Prisma is not installed. Installing Prisma...');
        execSync('npm install prisma @prisma/client', { stdio: 'inherit' });
        console.log('Prisma installed successfully.');
    }
    // Initialize Prisma if not already initialized
    if (!fs.existsSync(`${SCHEMA_PATH}/${SCHEMA_FILE_NAME}`)) {
        console.log('Initializing Prisma...');
        execSync('npx prisma init', { stdio: 'inherit' });
        fs.unlinkSync('prisma/schema.prisma')
        fs.outputFileSync(`${SCHEMA_PATH}/${SCHEMA_FILE_NAME}`,DEFAULT_SCHEMA_FILE)
    }
    // Write the db.ts file
    const dbFilePath = path.join(dir, 'db.ts');
    if (!fs.existsSync(dbFilePath)) {
       
        fs.outputFileSync(dbFilePath, DB_CONTENT);
        console.log(`Created db.ts at ${dbFilePath}`);
    } else {
        console.log('db.ts already exists.');
    }

}
export function migrateModule(moduleName:string){
    execSync(`npx prisma migrate dev --name adding_${moduleName.toLowerCase()}`, { stdio: 'inherit' });
}