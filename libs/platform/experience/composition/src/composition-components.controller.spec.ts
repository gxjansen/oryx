import { TokenResolver } from '@spryker-oryx/core';
import { createInjector, destroyInjector, getInjector } from '@spryker-oryx/di';
import * as litRxjs from '@spryker-oryx/utilities';
import { LitElement } from 'lit';
import { of } from 'rxjs';
import { SpyInstance } from 'vitest';
import { ExperienceService } from '../../src/services';
import { Component } from '../../src/services/experience/models';
import { CompositionComponentsController } from './composition-components.controller';

const mockElement = {
  tagName: 'tagName',
} as unknown as LitElement;
const mockUid = 'mockUid';
const hideByRule = 'mockRule';

const mockComponent: Component = {
  id: 'mockId',
  type: 'mockType',
};

const mockComponentWithComposition: Component = {
  ...mockComponent,
  components: [mockComponent],
};

const mockComponentWithVisibility: Component = {
  ...mockComponent,
  components: [
    {
      ...mockComponent,
      options: {
        visibility: {
          hide: false,
        },
      },
    },
  ],
};

const mockComponentWithVisibilityHidden: Component = {
  ...mockComponent,
  components: [
    {
      ...mockComponent,
      options: {
        visibility: {
          hide: true,
        },
      },
    },
  ],
};

const mockComponentWithVisibilityRule: Component = {
  ...mockComponent,
  components: [
    {
      ...mockComponent,
      options: {
        visibility: {
          hideByRule,
        },
      },
    },
  ],
};

class MockExperienceService implements Partial<ExperienceService> {
  getComponent = vi.fn().mockReturnValue(of({}));
}

const mockObserve = {
  get: vi.fn().mockReturnValue(of(null)),
};
vi.spyOn(litRxjs, 'ObserveController') as SpyInstance;
(litRxjs.ObserveController as unknown as SpyInstance).mockReturnValue(
  mockObserve
);

class MockTokenResolver implements Partial<TokenResolver> {
  resolveToken = vi.fn().mockReturnValue(of(false));
}

describe('CompositionComponentsController', () => {
  let experienceService: MockExperienceService;
  let tokenResolver: MockTokenResolver;

  beforeEach(() => {
    createInjector({
      providers: [
        {
          provide: ExperienceService,
          useClass: MockExperienceService,
        },
        {
          provide: TokenResolver,
          useClass: MockTokenResolver,
        },
      ],
    });

    experienceService =
      getInjector().inject<MockExperienceService>(ExperienceService);
    tokenResolver = getInjector().inject<MockTokenResolver>(TokenResolver);
  });

  afterEach(() => {
    destroyInjector();
    vi.clearAllMocks();
  });

  describe('hasDynamicallyVisibleChild', () => {
    describe('when uid is not provided', () => {
      const callback = vi.fn();
      beforeEach(() => {
        const controller = new CompositionComponentsController(mockElement);
        controller.hasDynamicallyVisibleChild().subscribe(callback);
      });

      it('should return false', () => {
        expect(callback).toBeCalledWith(false);
      });
    });

    describe('when component has no composition components', () => {
      const callback = vi.fn();
      beforeEach(() => {
        mockObserve.get = vi.fn().mockReturnValue(of(mockUid));
        experienceService.getComponent = vi
          .fn()
          .mockReturnValue(of(mockComponent));
        const controller = new CompositionComponentsController(mockElement);
        controller.hasDynamicallyVisibleChild().subscribe(callback);
      });

      it('should return false', () => {
        expect(callback).toBeCalledWith(false);
      });
    });

    describe('when component has composition components without visibility config', () => {
      const callback = vi.fn();
      beforeEach(() => {
        experienceService.getComponent = vi
          .fn()
          .mockReturnValue(of(mockComponentWithComposition));
        const controller = new CompositionComponentsController(mockElement);
        controller.hasDynamicallyVisibleChild().subscribe(callback);
      });

      it('should return false', () => {
        expect(callback).toBeCalledWith(false);
      });
    });

    describe('when component has composition components with visibility config', () => {
      const callback = vi.fn();
      beforeEach(() => {
        experienceService.getComponent = vi
          .fn()
          .mockReturnValue(of(mockComponentWithVisibility));
        const controller = new CompositionComponentsController(mockElement);
        controller.hasDynamicallyVisibleChild().subscribe(callback);
      });

      it('should return true', () => {
        expect(callback).toBeCalledWith(true);
      });
    });
  });

  describe('getComponents', () => {
    describe('when component has no composition components', () => {
      const callback = vi.fn();
      beforeEach(() => {
        experienceService.getComponent = vi
          .fn()
          .mockReturnValue(of(mockComponent));
        const controller = new CompositionComponentsController(mockElement);
        controller.getComponents().subscribe(callback);
      });

      it('should return empty array', () => {
        expect(callback).toBeCalledWith([]);
      });
    });

    describe('when component has composition components without visibility config', () => {
      const callback = vi.fn();
      beforeEach(() => {
        experienceService.getComponent = vi
          .fn()
          .mockReturnValue(of(mockComponentWithComposition));
        const controller = new CompositionComponentsController(mockElement);
        controller.getComponents().subscribe(callback);
      });

      it('should not filter the components', () => {
        expect(callback).toBeCalledWith(
          mockComponentWithComposition.components
        );
      });
    });

    describe('when component has composition components that are not hidden', () => {
      const callback = vi.fn();
      beforeEach(() => {
        experienceService.getComponent = vi
          .fn()
          .mockReturnValue(of(mockComponentWithVisibility));
        const controller = new CompositionComponentsController(mockElement);
        controller.getComponents().subscribe(callback);
      });

      it('should not filter the components', () => {
        expect(callback).toBeCalledWith(mockComponentWithVisibility.components);
      });
    });

    describe('when component has hidden composition components', () => {
      const callback = vi.fn();
      beforeEach(() => {
        experienceService.getComponent = vi
          .fn()
          .mockReturnValue(of(mockComponentWithVisibilityHidden));
        const controller = new CompositionComponentsController(mockElement);
        controller.getComponents().subscribe(callback);
      });

      it('should filter the components', () => {
        expect(callback).toBeCalledWith([]);
      });
    });

    describe('when component has composition components with dynamic visibility rule', () => {
      describe('and rule is resolved with false', () => {
        const callback = vi.fn();
        beforeEach(() => {
          experienceService.getComponent = vi
            .fn()
            .mockReturnValue(of(mockComponentWithVisibilityRule));
          const controller = new CompositionComponentsController(mockElement);
          controller.getComponents().subscribe(callback);
        });

        it('should resolve the token', () => {
          expect(tokenResolver.resolveToken).toBeCalledWith(hideByRule);
        });

        it('should not filter the components', () => {
          expect(callback).toBeCalledWith(
            mockComponentWithVisibilityRule.components
          );
        });
      });

      describe('and rule is resolved with true', () => {
        const callback = vi.fn();
        beforeEach(() => {
          tokenResolver.resolveToken = vi.fn().mockReturnValue(of(true));
          experienceService.getComponent = vi
            .fn()
            .mockReturnValue(of(mockComponentWithVisibilityRule));
          const controller = new CompositionComponentsController(mockElement);
          controller.getComponents().subscribe(callback);
        });

        it('should resolve the token', () => {
          expect(tokenResolver.resolveToken).toBeCalledWith(hideByRule);
        });

        it('should filter the components', () => {
          expect(callback).toBeCalledWith([]);
        });
      });
    });
  });
});