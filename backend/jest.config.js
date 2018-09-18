const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

module.exports = {
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/__test__/',
    '<rootDir>/coverage/'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: ['<rootDir>/src/**/*', '!**/__tests__/**/*'],
  collectCoverage: false
};
