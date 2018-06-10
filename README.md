# levo-admin
The web UI for Levo admin dashboard. It is based on a UI frame work that is built on top of Bootstrap 4, its hand crafted components look great on all devices and works super fast even on mobile.

## Working with Gulp

Gulp is another famous build system supported by Levo Admin UI, gulp's use of streams and code-over-configuration makes for a simpler and more intuitive build.

#### Installing Gulp

To install gulp first you must have NodeJS installed, NodeJS will have npm (node packaged modules).

Run the following commands:

* Install `gulp` globally by running the following command `npm install -g gulp`
* In you downloaded package from themeforest, navigate to `gulp/directory` and copy both `package.json gulpfile.js` to your project root. e.g : getting_started folder
* Navigate to the root directory of your project or getting_started folder, then run `npm install`.


Once you have succesfully setup now you can use pages Gulp CLI commands to automate your task.

#### Commands

#### `gulp build`

This will automatically minify your assets resources like css and js into a folder called dist.

#### `gulp watch`

This will automaically compile the pages Less files on save.

#### `gulp less`

This will compile the pages Less files on excute once.

Your are free to customize the Gulp task to your need by editing the gulpfile.js