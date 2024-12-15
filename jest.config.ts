import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json'],
    rootDir: './',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/',
    }),
    testMatch: ['**/*.spec.ts'],
    collectCoverage: true,
    coverageDirectory: 'tests/coverage',
    coveragePathIgnorePatterns: ['/node_modules/', '/tests/coverage'],
    verbose: true,
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    roots: ['tests'],
};

export default config;
