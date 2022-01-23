import { render } from '@testing-library/vue';
import { composeStories } from '@storybook/testing-vue3';
import * as Stories from './TaskList.stories';

const { InputFilled, Default } = composeStories(Stories)

test('タスクが存在しないときリストは表示されない', () => {
  const { queryAllByRole } = render(Default())
  expect(queryAllByRole('listitem').length).toBe(0)
})

test('タスク名を入力して追加ボタンをクリックするとリストに追加される', async () => {
  const { container } = render(InputFilled());
  await Stories.InputFilled.play?.({ canvasElement: container } as any);
});