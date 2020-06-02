import { TestBed } from '@angular/core/testing';
import { I18nConfig, TranslationChunkService } from '@spartacus/core';
import { of } from 'rxjs';
import { FSTranslationService } from './translation.service';

const testKey = 'testKey';

describe('FSTranslationService', () => {
  let service: FSTranslationService;

  beforeEach(() => {
    const mockTranslationChunk = {
      getChunkNameForKey: jasmine
        .createSpy('getChunkNameForKey')
        .and.returnValue('testChunk'),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: I18nConfig, useValue: { production: false } },
        {
          provide: TranslationChunkService,
          useValue: mockTranslationChunk,
        },
        FSTranslationService,
      ],
    });
    service = TestBed.get(FSTranslationService);
  });

  it('should get translation value', () => {
    spyOn(service, 'translate').and.returnValue(of('test value'));
    const result = service.getTranslationKey(['testChunk'], testKey);
    expect(result).toBe('test value');
  });

  it('should not get translation value', () => {
    const result = service.getTranslationKey(['testChunk'], testKey);
    expect(result).toBe(undefined);
  });
});
