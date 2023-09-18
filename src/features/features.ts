import * as vscode from "vscode";
import { getQuickPickList } from "../helpers/utils";
export const showQuickPick = (
  suggestions: string[],
  onChange: (value: string) => void
) => {
  let input: string;
  function filteredSuggestions(input: string) {
    return suggestions.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
  }

  const quickPick = vscode.window.createQuickPick();
  quickPick.items = getQuickPickList(suggestions);

  quickPick.onDidChangeValue((value) => {
    input = value;
    quickPick.items = getQuickPickList(filteredSuggestions(value));
  });
  quickPick.onDidAccept(() => {
    const selectedValue = quickPick.selectedItems[0] || {
      label: quickPick.value,
    };
    onChange(selectedValue.label);
    quickPick.hide();
  });

  quickPick.show();
};

export default {};
