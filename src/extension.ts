import * as vscode from 'vscode';
import { getTranslationText } from "lingva-scraper";

export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('Congratulations, your extension "translator" is now active!');

	let disposable = vscode.commands.registerCommand("translator.translate", () => {
		vscode.window.showInputBox({
			placeHolder: "Enter the word(s) to translate"
		}).then(input => {
			getTranslationText("auto" as never, "en" as never, input!).then(value => {
				if (value !== undefined) {
					vscode.window.activeTextEditor?.edit(edit => {
						edit.insert(vscode.window.activeTextEditor?.selection.active!, value?.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join("")!);
					});
				}
			});
		});
	});
	

	  context.subscriptions.push(disposable);
}

export function deactivate() {}
