# ASCII Titles

         _      ____     ____   ___   ___     _____   _   _     _
        / \    / ___|   / ___| |_ _| |_ _|   |_   _| (_) | |_  | |   ___   ___ 
       / _ \   \___ \  | |      | |   | |      | |   | | | __| | |  / _ \ / __|
      / ___ \   ___) | | |___   | |   | |      | |   | | | |_  | | |  __/ \__ \
     /_/   \_\ |____/   \____| |___| |___|     |_|   |_|  \__| |_|  \___| |___/

A simple VSCode extension built on figlet.js to generate ascii art comment titles

Patorjk/ figlet.js : https://github.com/patorjk/figlet.js

Built as a small project to try out the VSCode extension API, inspiration taken 
from Microsoft's VSCode Extension Samples. 

Microsoft/ VSCode Extension Samples : https://github.com/microsoft/vscode-extension-samples


# How To Use

Using the the command palette (<kbd>control</kbd> + <kbd>shift</kbd> + <kbd>p</kbd>)

Insert Title At Selection:

![Animation](https://user-images.githubusercontent.com/101033922/219805514-5df06549-6fcd-48c6-81a5-9b6e0ccc62cd.gif)

    Select the whole line that includes the text. 
    This will use the settings that are currently set.

Insert Random Title At Selection:

![AnimationRandom](https://user-images.githubusercontent.com/101033922/219808060-4c28148d-f4be-4902-b9f3-0cd274e3954e.gif)

    Works the same way but uses a random font, with the fonts 
    default kerning and line width.

Set Font: 

![Changefont](https://user-images.githubusercontent.com/101033922/219810589-9688c4ae-2c45-460a-9f4e-3a89f0a57e91.gif)

    Sets the font to use when using Insert Title At Selection.
    A graphical view of fonts can be found here: 
    https://ascii.today/

Set Kerning: 

![kerning](https://user-images.githubusercontent.com/101033922/219811142-2218df57-1c63-4aef-899d-2b8c10f5576c.gif)

    Sets the kerning to use when using Insert Title At Selection

Set Width:

    Sets the width to use when using Insert Title At Selection

Set Whitespace break:

    Sets the whitespace break property when using Insert Title At Selection
