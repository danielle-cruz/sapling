# sapling
Project files for Sapling, a growth-oriented social computing system

# Setting up Expo 
Pull project files from GitHub
cd into sapling/
Follow the expo installation documentation: https://docs.expo.io/get-started/installation/ (install node.js, git, and watchman)
Run npm install
Run npm install --global expo-cli
if you get an EACCESS permission error, run sudo chown -R $USER /usr/local/lib/node_modules
If you've used watchman recently, make sure they are closed (watchman watch-del-all)
run expo install
Run expo start

## GitHub practices

##### Create a new branch for yourself:

`git switch -c [NEW_BRANCH_NAME]`

This keeps the main branch clean as you experiment with adding different functionality.


### BEFORE YOU START WORKING ON ANYTHING:

#### Assumming you are working with GitHub desktop:

Go to toolbar on gitHubDesktop > branch > Update from master

Probably worth it to click “fetch origin” as well

'

##### Switch to another branch:

`git switch [BRANCH_NAME]` 

You can open files using any text editor (vim, emacs, visualStudio)
In visualStudio, you can change a setting so the command line prompt “code .” opens files

##### comitting, pushing, and creating pull requests:

After modifying files, you need to “commit,” “push,” and create a “pull request”:
GitHub desktop makes commits really easy: Type out a summary and description of your commit on gitHub desktop, then click “submit”, then click “push to origin”, then click “create pull request". You can also lookup the command line codes for these.
