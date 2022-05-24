import { css } from 'lit';

export const searchboxStyles = css`
  .search,
  .clear {
    cursor: pointer;
  }

  .clear[type='remove'] {
    --oryx-icon-size: var(--oryx-icon-size-medium);
  }

  .clear {
    opacity: 0%;
    z-index: 1;
    transition: opacity var(--oryx-transition-time, 0.3s);
    align-self: center;
  }

  :host(:not([has-value])) [appearance='SHOW'] {
    display: none;
  }

  :host([has-value]) .clear:not([appearance='HOVER']),
  :host([has-value]) .clear[appearance='HOVER']:hover {
    opacity: 100%;
  }

  .clear:not([appearance='SHOW']) + oryx-icon {
    position: absolute;
  }

  :host([has-value]) .clear[appearance='TOGGLE'] + .search,
  :host([has-value]) .clear[appearance='HOVER']:hover + .search {
    opacity: 0%;
  }
`;