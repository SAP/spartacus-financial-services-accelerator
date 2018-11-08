import { ServerConfig } from '../../config/index';

export abstract class SiteContextConfig extends ServerConfig {
  site?: {
    baseSite?: string;
    language?: string;
    currency?: string;
  };
}

export const defaultSiteContextConfig: SiteContextConfig = {
  site: {
    baseSite: 'insurance',
    language: 'en',
    currency: 'USD'
  }
};
