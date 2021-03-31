import { FormsUtils } from './forms-utils';

const testObject = {
  listAttribute: [
    {
      testAttribute: '10-10-1988',
    },
  ],
};

describe('FormsUtils', () => {
  it('should converte to date', () => {
    const date = '29-01-1990';
    expect(FormsUtils.convertIfDate(date)).toEqual('1990-01-29');
  });

  it('should get value from object by path', () => {
    const fieldPath =
      'insuranceQuote.insuredObjectList.insuredObjects[0].childInsuredObjectList.insuredObjects[0].dateOfBirth';
    const object = {
      type: 'cartWsDTO',
      insuranceQuote: {
        insuredObjectList: {
          insuredObjects: [
            {
              childInsuredObjectList: {
                insuredObjects: [
                  {
                    dateOfBirth: '10-10-1988',
                  },
                ],
              },
            },
          ],
        },
      },
    };
    expect(FormsUtils.getValueByPath(fieldPath, object)).toEqual(
      testObject.listAttribute[0].testAttribute
    );
  });
});
