This template project was created by Facebook's [Create React App](https://github.com/facebook/create-react-app) and `yarn run eject` command. 

I realize that whenever I ejected a react app made using `create-react-app`, I had to spend a few hours cleaning up folders and files after ejection. This template is created to speed up this process.

Steps that I did:
* `npx create-react-app ejected-create-react-app`
* `cd ejected-create-react-app`
* `yarn run eject` (choose `y`)
* transfer eslint, jest, babel, and browserslist configs to their own separate files from `package.json` file
* clean up `config` and `scripts` folders based on eslint
* reduce runtime dependencies by moving modules that are required only during development to `devDependencies` in `package.json`

To create a new project using `ejected-create-react-app` template:
* download the repo: `git clone git@github.com:buihdk/ejected-create-react-app.git`
* rename the repo: `mv ejected-create-react-app YOUR-APP-NAME`
* go to the repo: `cd YOUR-APP-NAME`
* update package.json file: change the name from `ejected-create-react-app` to `YOUR-APP-NAME`
