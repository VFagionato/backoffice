import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testPathIgnorePatterns: [
    '<rootDir>/src/infra/database/',
    '<rootDir>/src/infra/http/dtos',
  ],
  testRegex: ['.*\\.spec\\.ts$', '.*\\.e2e-spec\\.ts$'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/infra/database/',
    '<rootDir>/src/infra/http/dtos',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};

export default config;
