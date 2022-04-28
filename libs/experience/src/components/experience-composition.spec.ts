import { fixture } from '@open-wc/testing-helpers';
import { CoreServices } from '@spryker-oryx/core';
import { createInjector } from '@spryker-oryx/injector';
import { html, TemplateResult } from 'lit';
import { Observable, of } from 'rxjs';
import {
  Component,
  ComponentsRegistryContract,
  ExperienceService,
  Services,
} from '../services';
import './';
import { ExperienceComposition } from './experience-composition';

const BASE_COMPONENTS = [
  { id: '1', type: 'oryx-banner' },
  { id: '2', type: 'oryx-banner' },
  { id: '3', type: 'oryx-banner' },
];

class MockExperience implements Partial<ExperienceService> {
  components = [...BASE_COMPONENTS];
  getStructure = (): Observable<Component> =>
    of({
      id: '',
      type: '',
      components: this.components,
    });
}

class MockSSRAwaiter {
  getAwaiter(key: string): any {
    return () => {
      //do nothing
    };
  }
}

class MockComponentsRegistryService
  implements Partial<ComponentsRegistryContract>
{
  resolveComponent(type: string): Observable<string> {
    return of(type);
  }

  resolveTemplate(type: string, uid: string): TemplateResult {
    return html`<oryx-banner uid="${uid}"></oryx-banner>`;
  }
}

describe('Experience Composition', () => {
  let element: ExperienceComposition;

  beforeEach(async () => {
    createInjector({
      override: true,
      providers: [
        {
          provide: Services.Experience,
          useClass: MockExperience,
        },
        {
          provide: Services.ComponentsRegistry,
          useClass: MockComponentsRegistryService,
        },
        {
          provide: CoreServices.SSRAwaiter,
          useClass: MockSSRAwaiter,
        },
      ],
    });

    element = await fixture(
      html`<experience-composition key="1"></experience-composition>`
    );
  });

  it('is defined', () => {
    const el = document.createElement('experience-composition');
    expect(el).toBeInstanceOf(ExperienceComposition);
  });

  it('should render oryx-banner', () => {
    const banner = element?.shadowRoot?.querySelector('oryx-banner');
    expect(banner).toBeTruthy();
  });

  it('should render components with uid attributes', () => {
    const banner = element?.shadowRoot?.querySelector('oryx-banner');

    expect(banner?.getAttribute('uid')).toBe('1');
  });
});