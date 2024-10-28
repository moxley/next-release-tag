/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.(js|tsx?)$': ['ts-jest', {}],
  },
};
