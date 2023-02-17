// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const figlet = require('figlet');


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("ascii-titles.helloWorld",
        function () {
            // The code you place here will be executed every time your command is executed
            const editor = vscode.window.activeTextEditor;

            if (editor) {
                const document = editor.document;
                const selection = editor.selection;

                // Get the word within the selection
                var title = document.getText(selection);

                figlet(title, function (err, data) {
                    if (err) {
                        console.log('Something went wrong...');
                        console.dir(err);
                        return;
                    }
                    title = data;
                });

                editor.edit((editBuilder) => {
                    editBuilder.replace(selection, title);
                });
                vscode.commands.executeCommand('editor.action.addCommentLine');
            }
        }
    );

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate,
};
