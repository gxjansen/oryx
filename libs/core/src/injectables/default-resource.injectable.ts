import { ssrAwaiter } from '@spryker-oryx/core/utilities';
import { resolve } from '@spryker-oryx/injector';
import { isPromise, ResourceInjectable } from '@spryker-oryx/utilities';
import { asyncValue } from '@spryker-oryx/utilities/lit-rxjs';
import { DirectiveResult } from 'lit-html/directive.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Graphic } from '../orchestration';
import { ResourceService } from '../services';

export class DefaultResourceInjectable implements ResourceInjectable {
  getUrl(token: string): DirectiveResult | undefined {
    return this.getGraphicValue(token, 'url');
  }

  getSource(token: string): DirectiveResult | undefined {
    return this.getGraphicValue(token, 'source');
  }

  protected getGraphicValue(
    token: string,
    key: keyof Graphic
  ): DirectiveResult | undefined {
    const resourcesService = resolve(ResourceService);
    const value = resourcesService.getGraphicValue(token, key);
    const render = (v: string): DirectiveResult | string =>
      key === 'source' ? unsafeHTML(v) : v;

    if (value === undefined) {
      return;
    }

    if (isPromise(value)) {
      return asyncValue(ssrAwaiter(value), render);
    }

    return render(value);
  }
}
