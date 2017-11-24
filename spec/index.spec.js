/* istanbul ignore file */
const { expect } = require('chai');
const { stub } = require('sinon');
const uuid = require('uuid');

const testValueGenerator = require('../');

describe('test-value-generator', () => {
  it('should expose the expected functions', () => {
    expect(testValueGenerator.incremental).to.be.a('function');
    expect(testValueGenerator.unique).to.be.a('function');
    expect(testValueGenerator).to.have.all.keys('incremental', 'unique');
  });

  describe('incremental', () => {
    it('should produce incremental values', () => {
      const generator = testValueGenerator.incremental(i => `test-${i}`);
      expect([
        generator(),
        generator(),
        generator()
      ]).to.eql([
        'test-0',
        'test-1',
        'test-2'
      ]);
    });

    it('should pass additional arguments to the generator function', () => {
      const generator = testValueGenerator.incremental((i, server, tld) => `person-${i}@${server}.${tld}`);
      expect([
        generator('example', 'com'),
        generator('example', 'org'),
        generator('example', 'com')
      ]).to.eql([
        'person-0@example.com',
        'person-1@example.org',
        'person-2@example.com'
      ]);
    });
  });

  describe('unique', () => {
    it('should produce values by using the provided function', () => {

      // If this test fails, you should play the lottery.  According to
      // Wikipedia: "For there to be a one in a billion chance of duplication,
      // 103 trillion version 4 UUIDs must be generated."
      const generator = testValueGenerator.unique(() => uuid.v4());

      expect([
        generator(),
        generator(),
        generator()
      ]).to.have.lengthOf(3);
    });

    it('should throw an error if it cannot find a unique value after calling the provided function 10 times', () => {

      const trueRandomDiceRolls = [
        4, 2, 4, 3, 6, 5, 5, 5, 2, 2, 1,
        2, 2, 4, 3, 1, 4, 5, 3, 3, 6
      ];

      const rollDice = stub().callsFake(() => trueRandomDiceRolls.shift());

      const generator = testValueGenerator.unique(rollDice);

      expect([
        generator(),
        generator(),
        generator(),
        generator(),
        generator(),
        generator()
      ]).to.eql([ 4, 2, 3, 6, 5, 1 ]);

      expect(rollDice.callCount, 'rollDice.callCount').to.equal(11);

      expect(() => generator()).to.throw('Could not generate unique value after 10 attempts');
      expect(rollDice.callCount, 'rollDice.callCount').to.equal(21);
    });
  });
});
