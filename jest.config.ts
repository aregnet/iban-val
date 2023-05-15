export default {
    roots: ['<rootDir>/test', '<rootDir>/src'],
    testMatch: ['<rootDir>/test/**/*.ts'],

    transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts']
};
