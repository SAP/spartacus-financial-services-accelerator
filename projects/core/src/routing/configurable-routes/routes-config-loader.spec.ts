import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../../config';
import { ConfigurableRoutesConfig } from './configurable-routes-config';
import { RoutesConfigLoader } from './routes-config-loader';
import { BehaviorSubject, of } from 'rxjs';
import { RoutesConfig } from './routes-config';

const mockHttpClient = {
  get: () => new BehaviorSubject(null)
};
const mockServerConfig: ServerConfig = { server: { baseUrl: 'test-base-url' } };
const mockConfigurableRoutesModuleConfig: ConfigurableRoutesConfig = {
  routesConfig: {
    translations: {
      default: {
        page1: ['default-path1'],
        page2: ['default-path2', 'default-path20'],
        page3: ['default-path3']
      },
      en: {
        page1: ['en-path1', 'en-path10'],
        page2: ['en-path2']
      }
    },
    parameterNamesMapping: {
      page1: {
        param1: 'otherParam1'
      }
    }
  }
};
const mockFetchedRoutesConfig: RoutesConfig = {
  translations: {
    default: {
      page1: ['fetched-default-path1']
    },
    en: {
      page1: ['fetched-en-path1', 'fetched-en-path10']
    }
  },
  parameterNamesMapping: {
    page1: {
      param1: 'fetched-otherParam1',
      param2: 'fetched-otherParam2'
    }
  }
};

describe('RoutesConfigLoader', () => {
  let loader: RoutesConfigLoader;
  let http: HttpClient;
  let configurableRoutesConfig: ConfigurableRoutesConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoutesConfigLoader,
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: ServerConfig, useValue: mockServerConfig },
        {
          provide: ConfigurableRoutesConfig,
          useValue: mockConfigurableRoutesModuleConfig
        }
      ]
    });

    loader = TestBed.get(RoutesConfigLoader);
    http = TestBed.get(HttpClient);
    configurableRoutesConfig = TestBed.get(ConfigurableRoutesConfig);
  });

  describe('loadRoutesConfig', () => {
    describe(', when shouldFetch is configured to true,', () => {
      beforeEach(() => {
        configurableRoutesConfig.routesConfig.fetch = true;
      });

      it('should fetch routes config from url', () => {
        spyOn(http, 'get').and.returnValue(of(null));
        loader.load();
        expect(http.get).toHaveBeenCalled();
      });

      it('should place routes config under "routesConfig" property', async () => {
        spyOn(http, 'get').and.returnValue(of(mockFetchedRoutesConfig));
        expect(loader.routesConfig).toBeFalsy();
        await loader.load();
        expect(loader.routesConfig).toBeTruthy();
      });

      it('should extend fetched routes config with static one and extend routes translations for languages with "default"', async () => {
        spyOn(http, 'get').and.returnValue(of(mockFetchedRoutesConfig));
        await loader.load();
        expect(loader.routesConfig).toEqual(
          jasmine.objectContaining({
            translations: {
              default: {
                page1: ['fetched-default-path1'],
                page2: ['default-path2', 'default-path20'],
                page3: ['default-path3']
              },
              en: {
                page1: ['fetched-en-path1', 'fetched-en-path10'],
                page2: ['en-path2'],
                page3: ['default-path3']
              }
            },
            parameterNamesMapping: {
              page1: {
                param1: 'fetched-otherParam1',
                param2: 'fetched-otherParam2'
              }
            }
          })
        );
      });
    });

    describe(', when shouldFetch is configured to false,', () => {
      beforeEach(() => {
        configurableRoutesConfig.routesConfig.fetch = false;
      });

      it('should NOT fetch routes config', () => {
        spyOn(http, 'get');
        loader.load();
        expect(http.get).not.toHaveBeenCalled();
      });

      it('should place routes config under "routesConfig" property', () => {
        expect(loader.routesConfig).toBeFalsy();
        loader.load();
        expect(loader.routesConfig).toBeTruthy();
      });

      it('should use static routes config and extend routes translations for languages with "default"', () => {
        spyOn(http, 'get').and.returnValue(of(mockFetchedRoutesConfig));
        loader.load();
        expect(loader.routesConfig).toEqual(
          jasmine.objectContaining({
            translations: {
              default: {
                page1: ['default-path1'],
                page2: ['default-path2', 'default-path20'],
                page3: ['default-path3']
              },
              en: {
                page1: ['en-path1', 'en-path10'],
                page2: ['en-path2'],
                page3: ['default-path3']
              }
            },
            parameterNamesMapping: {
              page1: {
                param1: 'otherParam1'
              }
            }
          })
        );
      });
    });
  });
});
