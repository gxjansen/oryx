import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import '../../../../../option/src/index';
import { branches, sideBySide, states } from '../../../../../utilities';
import '../../index';
import { FilterStrategyType } from '../../index';

export default {
  title: `${storybookPrefix}/Search/Typeahead/Static/Filter`,
} as Meta;

interface FilterProps {
  options: string;
}

const Template: Story<FilterProps> = ({
  options,
}: FilterProps): TemplateResult => {
  const list = options === 'states' ? states : branches;
  return sideBySide(html`
    <oryx-select
      ?filter=${true}
      filterStrategy=${FilterStrategyType.START_OF_WORD}
    >
      <input value="f" placeholder="filter the list by typing" />
      ${list.map((state) => html`<oryx-option value=${state}></oryx-option>`)}
    </oryx-select>
  `);
};

export const StartOfWord = Template.bind({});
StartOfWord.args = {
  options: 'branches',
};

StartOfWord.argTypes = {
  options: {
    options: ['states', 'branches'],
    control: { type: 'select' },
  },
};