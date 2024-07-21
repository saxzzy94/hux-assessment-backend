module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1" 
    }
  };
  