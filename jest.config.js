module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  verbose: true,
  rootDir: './',
  testRegex: '.spec\\.ts$',
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@absolute(.*)$': '<rootDir>/src$1',
  },
};
