-   Here's how to setup the remote so that it doesn't prompt you for the username and password
    -   `git remote set-url origin https://ErikSharp:<PASSWORD>@github.com/ErikSharp/LearningJavascript.git`
        -   keep in mind that this is going to save this text at /LearningJavascript/.git/config but this file is not checked in
-   How to get the remote URL
    -   `git config --get remote.origin.url`
- This can be run either through the debugger with F5 or with `npm start`
