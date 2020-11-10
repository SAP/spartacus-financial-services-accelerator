import { GeneralHelpers } from './helpers';

const testObject = {
  root: {
    level1: {
      level2: 'value',
    },
  },
};

const emptyObject = {};

describe('FormHelperService', () => {
  it('should check form object dept', () => {
    expect(GeneralHelpers.getObjectDepth(testObject)).toEqual(3);
  });

  it('should return 0 where object is empty', () => {
    expect(GeneralHelpers.getObjectDepth(emptyObject)).toEqual(0);
  });
});
