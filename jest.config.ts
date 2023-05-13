export default {
    roots: ['<rootDir>/test', '<rootDir>/src'],
    testMatch: ['<rootDir>/test/**/*.ts'],

    transform: { '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }] },
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts']
};
