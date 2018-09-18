// Go back to http://www.albertgao.xyz/2017/06/19/test-your-model-via-jest-and-mongoose/

const isTest = process.env.NODE_ENV === 'test';
if (!isTest) {
  throw new Error('🙅  Not in a test environment! 🙅');
}

describe('First test', () => {
  test('should pass', () => {
    expect(true).toBeTruthy();
  });
});
