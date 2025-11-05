module.exports = {
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/"],
    moduleFileExtensions: ["js", "ts", "json", "node"],
    setupFilesAfterEnv: ["<rootDir>/backend/src/jest.setup.ts"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
};
