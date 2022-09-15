import { GlobalMessageConfig, GlobalMessageType } from '@spartacus/core';

export function defaultFSGlobalMessageConfigFactory(): GlobalMessageConfig {
  return {
    globalMessages: {
      [GlobalMessageType.MSG_TYPE_CONFIRMATION]: {
        timeout: 15000,
      },
      [GlobalMessageType.MSG_TYPE_INFO]: {
        timeout: 15000,
      },
      [GlobalMessageType.MSG_TYPE_WARNING]: {
        timeout: 15000,
      },
      [GlobalMessageType.MSG_TYPE_ERROR]: {
        timeout: 20000,
      },
    },
  };
}
