import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
export const radioGroupStyles = (context, definition) => css `
  ${display('flex')} :host {
    align-items: flex-start;
    flex-direction: column;
  }

  .positioning-region {
    display: flex;
    flex-wrap: wrap;
  }

  :host([orientation='vertical']) .positioning-region {
    flex-direction: column;
  }

  :host([orientation='horizontal']) .positioning-region {
    flex-direction: row;
  }
`;
