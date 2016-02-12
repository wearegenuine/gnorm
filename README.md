# GNorm - Genuine Norm Yeoman Generator

Genuine Norm (GNorm) is an all-encompassing starting point for Genuine UI projects that provides architectural direction, fast scaffolding, code familiarity and promotes developer scalability.

## Dependencies
* [Node JS](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/en/)
* [Bundler (Ruby Gem)](http://bundler.io/)
* [Gulp](http://gulpjs.com/)
* [Yeoman](http://yeoman.io/)

## Installation
Once you have installed the above dependencies:

1. Clone this repository into your development folder
2. Copy all files except for the .git directory into a new project folder
3. `cd` into the root of the new project folder and run `npm install && bundle install` from the command line

## Running
From the root of the project, several commands can be issued from terminal:

1. `gulp`: Runs the default Gulp task. This builds the project with source maps from the `app` folder into the `build` folder, spawns a Node server, opens a new browser with the website at http://localhost:3000, and listens for subsequent changes. When you edit and save a new file, Gulp will recompile accordingly and refresh your browser window with the latest changes automatically.
2. `gulp dev`: Runs the above Gulp task without spawning a server.
3. `gulp build`: Builds project from the `app` folder into the `build`, uglifies the JS, and minifies the CSS. This should generally be run prior to committing/pushing your code to the repo.
4. `gulp dist`: Runs the above task and spawns a localhost server. This is useful if you want to proof the production build before pushing it to a remote server.

## Project Architecture
#### Folder Structure

* `app/`: _All_ work should be done in the `app` folder. This is where your website's source code lives.
* `build/`: When running Gulp, files from `app` are compiled into `build`. If you work out of the `build` folder, your work will be overwritten and you will be sad. Don't work out of the `build` folder.
* `gulp/`: This contains all of the Gulp tasks that the project relies on. There is also a `config.js` file that most of the tasks reference to make file paths and preferences more manageable.
* `node_modules/`: The folder where node modules are installed when you run `npm install`.
* `.jshintrc`: The configuration file that dictates syntactical rules for JS linting. These should be followed closely.
* `.jsbeautifyrc`: The configuration file that can be used with Sublime Text's [HTML-CSS-JS Prettify](https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify) and Atom's [atom-beautify](https://atom.io/packages/atom-beautify) plugins.  Allows you to format your HTML, CSS, JavaScript, and JSON code. These plugins look for a `.jsbeautifyrc` file in the same directory as the source file you're prettifying (or any directory above if it doesn't exist, or in your home folder if everything else fails) and uses those options along the default ones.
* `.scss-lint.yml`: The configuration file for "linting" Sass/SCSS files.  Not currently enforced during build-time, but can be used with Sublime Text's [SublimeLinter](http://sublimelinter.readthedocs.org/en/latest/) plugin along with [Sublime​Linter-contrib-scss-lint](https://packagecontrol.io/packages/SublimeLinter-contrib-scss-lint), or Atom's [atom-lint](https://atom.io/packages/atom-lint) and [linter-scss-lint](https://atom.io/packages/linter-scss-lint) (among others).
* `Gemfile`: The package file that contains the project's gem dependencies. These are installed when you run `bundle install`.
* `gulpfile.js`: This references all of the tasks in `gulp/tasks/`. Tasks are broken apart for organizational purposes and referenced from this root file when you run `gulp`.
* `package.json`: Contains the project's Node dependencies. Modules specified in this files are installed into `node_modules` when you run `npm install`.
* `README.md`: You're reading it.

#### Atomic Organization
To encourage organization, scalability, and code-reuse, we generally take an [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) approach when structuring our HTML and Sass. Our Sass partials and HTML includes are broken apart in folders denoted by Atomic-style building blocks (atoms/pieces, molecules/components, organisms/regions, etc.).

## Usage
#### Writing HTML
Your HTML lives in the `app` folder, and can contain references to reusable includes (which live in `app/includes/`). For example:

    //= include includes/1_core/head.html

This allows you to write a piece of code once and reuse it in multiple places. When Gulp runs, it takes these includes and compiles the full HTML into the `build` folder.

_Note: The paths in which these includes are referenced are relative to the HTML file you are authoring. If you include an include from another include, that path will need to be prefixed with `../` accordingly._

#### Writing Sass
##### Sass Structure
Your styles live in the `app/styles/sass` folder. This folder is organized atomically:

* `screen.scss`: This contains globbing patterns that `@include` the Gem dependencies and partials contained in the following folders
* `0_utility/`: This contains font, helper, mixin, and variable declarations.
* `1_core/`: All bare (classless) HTML is styled in the `html-elements` folder. Icons are specified in the `_icons.scss` partial and the site's grid system is specified in the `_layout.scss` partial.
* `2_pieces/`: This is where your "Atoms" live.
* `3_components/`: This is where your "Molecules" live.
* `4_regions/`: This is where your "Organisms" live.
* `5_pages/`: This is where your "Layouts" live.

##### Changing/Adding Fonts
To prevent render blocking, Init leverages [Font Face Observer](https://github.com/bramstein/fontfaceobserver). Init comes with a font set of Roboto to demonstrate how fonts are set up using this pattern. In short, the script in `app/includes/1_core/head.html` listens for the font requests coming from `app/styles/sass/0_utility/_fonts.scss`. Using a promise, it will add a class of `fonts-loaded` to the body once the fonts have downloaded. This class is leveraged in `app/styles/sass/1_core/html-elements/_base.scss` to update the page with the custom webfonts. If you want to change or add fonts, follow these steps:

1. In `app/styles/sass/0_utility/_fonts.scss`, change or add a new font making sure to include the appropriate weight. Then update your font variable(s) accordingly.
2. In `app/includes/1_core/head.html`, create a new variable for each weight and update the weight property with the same weight you specified in step 1. 

##### Updating Icomoon Set
Init comes with a generic font set of icons that includes common things like arrows and social chiclets. To add or edit the icon font, upload `app/fonts/icomoon/selection.json` to the [Icomoon web-app](https://icomoon.io/app/#/select). From here, you can add and remove icons, then re-export. When you re-export, make sure you save the updated `selection.json`.


#### Writing JS
##### JS Structure
Init comes with a JS module loading system. This is how the JS folder is structured:

* `libs/`: This is where your vendor libraries and plugins live. Alternatively, you can use [Bower](http://bower.io/) if you really prefer.
* `modules/`: This is where your JS modules live.
* `modules/index.js`: This is the "module registry". It is essentially an object that contains a key/value for each module in the project.
* `app.js`: This is your application bootstrap. All JS kicks off from here.

##### Create A New Module Using The JS Module Loader

You can quickly generate a new module right from the command line. Run `gulp create-module --name=moduleName`, where _moduleName_ is the name of your new module. Be sure to keep it camelCase. Running this command will generate a new module folder as well as add a _require_ reference to the module registry file. If you use this CLI method instead of manually creating modules, you shouldn't ever have to touch the module registry file.

You can also pass an _async_ flag to the command. For example `gulp create-module --name=moduleName --async`. This will tell Webpack to bundle this file separately from the rest of the application and will asynchronously load this module in only when the module is referenced on the page.

When you generate a new module, it will have two files; the _.load_ file and the _.main_ file. You don't need to touch the _.main_ file. This simply tells Webpack how to require the module in the build (depending on whether you specified it to be asynchronous or not).

The _.main_ file is where you write your code. It exports an ES6 class:

```js
'use strict';

var $ = require('jquery');

module.exports = class SampleModule{
  constructor($el){
    this.$el = $el;
    this.method(this.$el);
  }
  method($element){
    console.log($element);
  }
};
```

If you're unfamiliar with the ES6 class syntax, you can read more about it [here](http://javascriptplayground.com/blog/2014/07/introduction-to-es6-classes-tutorial/).

Then reference the new module from somewhere in the HTML with the `data-module` attribute:

```html
<section class="outer-wrapper" data-module="sampleModule">
  <div class="inner-wrapper">
    <h1>My Module</h1>
  </div>
</section>
```

That's it! Now, when the page loads, `app/scripts/app.js` kicks off the module registry, which loops through all of the `data-module` attributes on the page and instantiates a `new` version of that module via the reference in the module registry.

_Note: The module loader passes a jQuery object of the element that contains `data-module`. This allows for easy scoping if you need to load more than one instance of the module on a page._

##### Using Third-Party Libraries/Plugins
Some plugins might not be available via NPM. Rather than use another package manager, we can leverage [Napa](https://www.npmjs.com/package/napa). Add the repo URL to the `napa` object in the `package.json` folder and reference it just like an NPM package.

If for whatever reason, there is no repository for the library you want to include, you can download it manually to `app/scripts/libs`, include via the `browser` object in `package.json`, and reference it just like an NPM module.

#### Using Sourcemaps
Init leverages JS and Sass sourcemapping for easy debugging. The sourcemaps are automatically built — all you need to do is configure your browser to use them.

##### Example set up using Chrome Dev Tools:

1. Run `gulp` to get your server running.
2. In Chrome Inspector, go into settings and make sure sourcemaps are enabled for both JS _and_ CSS.
3. Open the "Sources" tab in the inspector, and in the side pane on the left, right-click and select "Add Folder to Workspace". Select the root folder of the project, from your file system.
4. At the top of the browser, Chrome will prompt you for access. Click the "Allow" button.
5. In the left side pane of the Sources tab, you should now see your project folder. Expand it and and drill down to any one of your Sass partials. Click it once. In the middle pane, an alert should come up asking if you want to map the workspace resource. Click the "more" link to expand the dialog, then click "Establish the mapping now...".
6. A list of files should come up. Select the one that matches the file you just clicked on (generally the first one).
7. Inspector will want to restart.
8. That's it! Your local files should be tied to the sourcemaps the site loads. Now, when you inspect an element, look at the CSS pane and it should have a link to the exact partial for each rule declaration.

## Common issues

#### When I run `gulp`, the command line errors out. WTF?
Make sure you've installed _ALL_ dependencies specified above. Also, make sure you have up-to-date versions of Ruby and Node.

#### Why is Gulp not picking up on changes that I made to a file?
The `watch` task only picks up on changes made to files that existed when the task was started. When you edit a Gulp task, a config file, or add any new file to the `app` folder, you must stop and restart Gulp.
