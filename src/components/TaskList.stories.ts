import type { Story, Meta } from '@storybook/vue3'
import TaskList from "./TaskList.vue";
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: "TaskList",
  component: TaskList,
  argTypes: {}
} as Meta;

const Template: Story = (args) => ({
  components: { TaskList },
  setup() {
    return args
  },
  template: "<TaskList />",
});

export const Default = Template.bind({});
Default.args = {}

export const InputFilled = Template.bind({});
InputFilled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByLabelText("タスク名"), "牛乳を買う");
  await userEvent.click(canvas.getByRole('button', { name: '追加' }));

  await waitFor(() => {
    const items = canvas.getAllByRole('listitem');
    expect(items.length).toBe(1);
  })
}