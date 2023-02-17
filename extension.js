const vscode = require("vscode");
const figlet = require('figlet');

const settings = {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
}

//      _      ____     ____   ___   ___     _____   _   _     _
//     / \    / ___|   / ___| |_ _| |_ _|   |_   _| (_) | |_  | |   ___   ___ 
//    / _ \   \___ \  | |      | |   | |      | |   | | | __| | |  / _ \ / __|
//   / ___ \   ___) | | |___   | |   | |      | |   | | | |_  | | |  __/ \__ \
//  /_/   \_\ |____/   \____| |___| |___|     |_|   |_|  \__| |_|  \___| |___/

// A simple VSCode extension built on figlet.js to generate ascii art comment titles

// Patorjk/ figlet.js : https://github.com/patorjk/figlet.js

// Built as a small project to try out the VSCode extension API, inspiration taken 
// from Microsoft's VSCode Extension Samples. 

// Microsoft/ VSCode Extension Samples : https://github.com/microsoft/vscode-extension-samples

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Generatres a title using a random font
    let randomtitle = vscode.commands.registerTextEditorCommand("ascii-titles.randomtitle",
        function (editor) {

            const document = editor.document;
            const selection = editor.selection;
            const fontlist = figlet.fontsSync();

            var title = document.getText(selection);

            title = figlet.textSync(title, fontlist[Math.floor(Math.random() * fontlist.length)])

            editor.edit((editBuilder) => {
                editBuilder.replace(selection, title);
            });
            vscode.commands.executeCommand('editor.action.addCommentLine');
        }
    );

    context.subscriptions.push(randomtitle);

    // Generates a title using the settings object
    let withsettings = vscode.commands.registerTextEditorCommand("ascii-titles.title",
        function (editor) {

            const document = editor.document;
            const selection = editor.selection;

            var title = document.getText(selection);

            title = figlet.textSync(title, settings);

            editor.edit((editBuilder) => {
                editBuilder.replace(selection, title);
            });
            vscode.commands.executeCommand('editor.action.addCommentLine');
        });

    context.subscriptions.push(withsettings);

    // Sets the property of the settings object using a quickpick view 
    let setFont = vscode.commands.registerCommand("ascii-titles.setfont", async () => {
        await showQuickFontPick();
    });
    context.subscriptions.push(setFont);

    // Sets the property of the horizontal kerning with a quickpick view
    let setKerning = vscode.commands.registerCommand("ascii-titles.setkerning", async () => {
        await showQuickKerningPick();
    })
    context.subscriptions.push(setKerning);

    // Sets the width property with a inputbox, as an integer bound betewen 10 and 300
    // Bound is set somewhat randomly, as not all fonts seem to support higher width
    let setWidth = vscode.commands.registerCommand("ascii-titles.setwidth", async () => {
        await showWidthInputBox();
    })
    context.subscriptions.push(setWidth);

    // Sets the whitespace break property with a quickpick view
    let setBreak = vscode.commands.registerCommand("ascii-titles.setbreak", async () => {
        await showQuickBreakPick();
    })
    context.subscriptions.push(setBreak);

}

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
            if (isNaN(parsed) || (9 > parsed || parsed > 300)) { return "Enter an Integer Between 10 & 300" };
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
