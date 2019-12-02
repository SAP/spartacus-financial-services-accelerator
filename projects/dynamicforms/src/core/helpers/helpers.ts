export class GeneralHelpers {
    static getObjectDepth(obj, depth = 0) {
      if (typeof obj !== 'object') {
        return depth;
      }
      const [values, depthIncrease] = Array.isArray(obj)
        ? [obj, 0]
        : [Object.values(obj), 1];
      return values.length > 0
        ? Math.max(...values.map(
          value => this.getObjectDepth(value, depth + depthIncrease))
        )
        : depth;
    }
  }
