import { getPercentage, getUniqueSet } from './utils';

describe('Utils test suite', () => {
  describe('getPercentage test suite', () => {
    it('getPercentage should return default value if total less than 1', () => {
      expect(getPercentage(0, 0)).toEqual('-');
    });

    it('getPercentage should return percentage value', () => {
      expect(getPercentage(1, 2)).toEqual('50.00%');
    });
  });

  describe('getUniqueSet test suite', () => {
    it('getUniqueSet should throw error if count is not an integer', () => {
      expect(() => getUniqueSet(3.1, 10)).toThrow(
        'Count must be a positive integer.'
      );
    });

    it('getUniqueSet should throw error if count less than 1', () => {
      expect(() => getUniqueSet(0, 10)).toThrow(
        'Count must be a positive integer.'
      );
    });

    it('getUniqueSet should return unique indexes', () => {
      const uniqueSet = getUniqueSet(3, 10);
      expect(uniqueSet[0]).not.toEqual(uniqueSet[1]);
      expect(uniqueSet[0]).not.toEqual(uniqueSet[2]);
      expect(uniqueSet[1]).not.toEqual(uniqueSet[2]);
    });

    it('getUniqueSet should return three elements', () => {
      const uniqueSet = getUniqueSet(3, 10);
      expect(uniqueSet).toHaveLength(3);
    });
  });
});
