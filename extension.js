// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const figlet = require('figlet');

var settings = {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerTextEditorCommand("ascii-titles.randomtitle",
        function (editor) {
            // The code you place here will be executed every time your command is executed
            const document = editor.document;
            const selection = editor.selection;
            const fontlist = figlet.fontsSync();

            // Get the word within the selection
            var title = document.getText(selection);

            title = figlet.textSync(title, fontlist[Math.floor(Math.random() * fontlist.length)])

            editor.edit((editBuilder) => {
                editBuilder.replace(selection, title);
            });
            vscode.commands.executeCommand('editor.action.addCommentLine');
        }
    );

    context.subscriptions.push(disposable);


    let withsettings = vscode.commands.registerTextEditorCommand("ascii-titles.title",
        function (editor) {

            const document = editor.document;
            const selection = editor.selection;

            // Get the word within the selection
            var title = document.getText(selection);

            title = figlet.textSync(title, settings);

            editor.edit((editBuilder) => {
                editBuilder.replace(selection, title);
            });
            vscode.commands.executeCommand('editor.action.addCommentLine');
        });

    context.subscriptions.push(withsettings);


    let setFont = vscode.commands.registerCommand("ascii-titles.setfont", async () => {
        await showQuickFontPick();
    });
    context.subscriptions.push(setFont);

    let setKerning = vscode.commands.registerCommand("ascii-titles.setkerning", async () => {
        await showQuickKerningPick();
    })
    context.subscriptions.push(setKerning);


    let setWidth = vscode.commands.registerCommand("ascii-titles.setwidth", async () => {
        await showWidthInputBox();
    })
    context.subscriptions.push(setWidth);

    let setBreak = vscode.commands.registerCommand("ascii-titles.setbreak", async () => {
        await showQuickBreakPick();
    })
    context.subscriptions.push(setBreak);

}

// This method is called when your extension is deactivated
function deactivate() { }


const window = vscode.window

async function showQuickFontPick() {

    const fontlist = figlet.fontsSync();
    const font = await window.showQuickPick(fontlist, {
        placeHolder: 'Pick a font',
    });
    settings.font = font;

}

async function showQuickKerningPick() {

    const kerning = await window.showQuickPick(["default", "fitted", "full"], {
        placeHolder: 'Pick a font',
    });
    settings.horizontalLayout = kerning;
}


async function showWidthInputBox() {
    const result = await window.showInputBox({
        value: settings.width.toString(),
        placeHolder: 'Enter a number',
        validateInput: text => {
            const parsed = parseInt(text);
            if (isNaN(parsed) || (9 > parsed || parsed > 81)) { return "Enter an Integer Between 10 & 80" };
            return null;
        }
    });

    const parsed = parseInt(result);
    if (isNaN(parsed)) { return };
    settings.width = parsed;
}

async function showQuickBreakPick() {

    const wbreak = await window.showQuickPick(["true", "false"], {
        placeHolder: 'Break on whitespace',
    });
    settings.whitespaceBreak = (wbreak === "true");
}

module.exports = {
    activate,
    deactivate,
};
