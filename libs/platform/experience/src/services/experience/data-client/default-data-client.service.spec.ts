import { nextFrame } from '@open-wc/testing-helpers';
import {
  App,
  AppRef,
  ComponentsPlugin,
  FeatureOptionsService,
  ResourcePlugin,
} from '@spryker-oryx/core';
import { createInjector, destroyInjector, getInjector } from '@spryker-oryx/di';
import { of, Subject } from 'rxjs';
import { optionsKey } from '../../../decorators';
import { DataIds, MessageType } from './data-client.model';
import { ExperienceDataClientService } from './data-client.service';
import { DefaultExperienceDataClientService } from './default-data-client.service';

const mockAppFn = {
  getResources: vi.fn(),
  getComponentClass: vi.fn(),
};

class MockApp implements Partial<App> {
  findPlugin = vi.fn().mockReturnValue(mockAppFn);
}

class MockFeatureOptionsService implements Partial<FeatureOptionsService> {
  getFeatureOptions = vi.fn().mockReturnValue(null);
}

class MockSuggestionService {
  get = vi.fn().mockReturnValue(of(null));
}

const getService = <T>(token: string) =>
  getInjector().inject(token) as unknown as T;

const test$ = new Subject<void>();

describe('ExperienceDataClientService', () => {
  beforeEach(() => {
    createInjector({
      providers: [
        {
          provide: ExperienceDataClientService,
          useClass: DefaultExperienceDataClientService,
        },
        {
          provide: AppRef,
          useClass: MockApp,
        },
        {
          provide: FeatureOptionsService,
          useClass: MockFeatureOptionsService,
        },
        {
          provide: 'oryx.SuggestionService',
          useClass: MockSuggestionService,
        },
      ],
    });
    vi.spyOn(window.parent, 'postMessage');
  });

  afterEach(() => {
    destroyInjector();
    test$.next();
  });

  describe('initialize', () => {
    it('should send `MessageType.Graphics` post message', () => {
      const mockResources = {
        graphics: {
          a: {},
          b: {},
          c: {},
        },
      };
      const app = getService<MockApp>(AppRef);
      mockAppFn.getResources.mockReturnValue(mockResources);
      getInjector()
        .inject(ExperienceDataClientService)
        .initialize()
        .subscribe();
      expect(app.findPlugin).toHaveBeenCalledWith(ResourcePlugin);
      expect(mockAppFn.getResources).toHaveBeenCalled();
      expect(window.parent.postMessage).toHaveBeenCalledWith(
        {
          type: MessageType.Graphics,
          [DataIds.Graphics]: Object.keys(mockResources.graphics),
        },
        '*'
      );
    });

    it('should send `MessageType.Options` post message', async () => {
      const mockDefaultOptions = {
        b: 'b',
      };
      const mockFeatureOptions = {
        c: 'c',
      };
      const mockComponentType = 'mockComponentType';
      const app = getService<MockApp>(AppRef);
      mockAppFn.getComponentClass.mockReturnValue({
        [optionsKey]: mockDefaultOptions,
      });
      getService<MockFeatureOptionsService>(
        FeatureOptionsService
      ).getFeatureOptions.mockReturnValue(mockFeatureOptions);
      getInjector()
        .inject(ExperienceDataClientService)
        .initialize()
        .subscribe();
      window.postMessage(
        {
          type: MessageType.ComponentType,
          [DataIds.ComponentType]: mockComponentType,
        },
        '*'
      );
      await nextFrame();
      expect(window.parent.postMessage).toHaveBeenCalledWith(
        {
          type: MessageType.Options,
          [DataIds.Options]: {
            ...mockDefaultOptions,
            ...mockFeatureOptions,
          },
        },
        '*'
      );
      expect(mockAppFn.getComponentClass).toHaveBeenCalledWith(
        mockComponentType
      );
      expect(app.findPlugin).toHaveBeenCalledWith(ComponentsPlugin);
    });

    it('should send `MessageType.Products` post message', async () => {
      const mockQuery = 'mockQuery';
      const mockSuggestions = {
        products: [
          {
            a: 'a',
            sku: 'skuA',
            name: 'nameA',
          },
          {
            b: 'b',
            sku: 'skuB',
            name: 'nameB',
          },
        ],
      };
      const suggestionService = getService<MockSuggestionService>(
        'oryx.SuggestionService'
      );
      suggestionService.get.mockReturnValue(of(mockSuggestions));
      getInjector()
        .inject(ExperienceDataClientService)
        .initialize()
        .subscribe();
      window.postMessage(
        {
          type: MessageType.Query,
          [DataIds.Query]: mockQuery,
        },
        '*'
      );
      await nextFrame();
      expect(suggestionService.get).toHaveBeenCalledWith({
        query: mockQuery,
      });
      expect(window.parent.postMessage).toHaveBeenCalledWith(
        {
          type: MessageType.Products,
          [DataIds.Products]: mockSuggestions.products.map(({ sku, name }) => ({
            sku,
            name,
          })),
        },
        '*'
      );
    });
  });
});
