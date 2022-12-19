import { inject } from '@spryker-oryx/injector';
import { Facet } from '@spryker-oryx/product';
import { FacetSelect } from '@spryker-oryx/search/facet';
import { TemplateResult } from 'lit-html';
import { FacetComponentRegistryService } from './facet-component-registry.service';
import {
  FacetMappingOptions,
  FacetParams,
  FacetRendererMapping,
  FacetValueRenderer,
} from './renderer';

export class DefaultFacetComponentRegistryService
  implements FacetComponentRegistryService
{
  protected facetComponentMap: FacetRendererMapping;

  constructor(protected facetValueRenderer = inject(FacetValueRenderer)) {
    this.facetComponentMap = this.facetValueRenderer.reduce(
      (acc, components) => ({ ...acc, ...components }),
      {}
    );
  }

  renderFacetComponent(
    facet: Facet,
    options: FacetMappingOptions,
    selectListener: (e: CustomEvent<FacetSelect>) => void
  ): TemplateResult {
    return this.facetComponentMap[FacetParams.Default].template(
      facet,
      options,
      selectListener
    );
  }
}
