export class GeneralHelpers {
    static getObjectDepth(data, depth = 0) {
      if (typeof data !== 'object') {
        return depth;
      }
      const [values, depthIncrease] = Array.isArray(data)
        ? [data, 0]
        : [Object.values(data), 1];
      return values.length > 0
        ? Math.max(...values.map(
          value => {
            return  this.getObjectDepth(value, depth + depthIncrease);
            })
        )
        : depth;
    }
  }
