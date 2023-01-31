import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 24px;
    background-color: var(--oryx-color-primary-100);
    padding-bottom: 48px;
  }

  oryx-heading {
    display: flex;
    align-items: center;
    color: var(--oryx-color-primary-300);
    gap: 40px;
    margin: 40px 0 16px;
  }

  h1 {
    font-size: 26px;
    line-height: 38px;
  }

  p {
    margin: 0;
  }
`;