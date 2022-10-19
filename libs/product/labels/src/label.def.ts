import { componentDef } from '@spryker-oryx/core';

export const productLabelsComponent = componentDef({
  name: 'product-labels',
  impl: () => import('./label.component').then((m) => m.ProductLabelsComponent),
});