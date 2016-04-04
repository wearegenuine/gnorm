# <%= appname %> - v<%= appversion %>
## <%= generatorversion %>

<%= appdescription %>

## Dependencies
* [Node JS](http://nodejs.org/)
* [Gulp](http://gulpjs.com/)

## Installation
Once you have installed the above dependencies:

1. `cd` into the root of the new project folder and run `npm install` from the command line

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
* `gulpfile.js`: This references all of the tasks in `gulp/tasks/`. Tasks are broken apart for organizational purposes and referenced from this root file when you run `gulp`.
* `package.json`: Contains the project's Node dependencies. Modules specified in this files are installed into `node_modules` when you run `npm install`.
* `README.md`: You're reading it.

#### Atomic Organization
To encourage organization, scalability, and code-reuse, we generally take an [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) approach when structuring our HTML and Sass. Our Sass partials and HTML includes are broken apart in folders denoted by Atomic-style building blocks (atoms/pieces, molecules/components, organisms/regions, etc.).

## Usage
#### Writing HTML

Init utilizes twig.js for creating templates and reusable components. Twig provides the ability to:

* Write a piece of code once and reuse it in multiple places.
* Use conditional code to allow for variation in the template or component.
* Use json data to populate content of each template, which allows the use of the same component partial within one or multiple templates with different content for each instance.

Your HTML lives in the `app` folder, and can contain references to reusable includes (which live in `app/includes/`). For example:

    {% include 'includes/3_components/media--person-card.twig' %}

Each main template in the `app` folder also requires a `json` file that includes any data utilized in the template. These data files live in the `app/json` folder and must use the same name as the template file.

When Gulp runs, it takes the includes and data, and compiles the full HTML into the `build` folder.

_Note: The paths in which these includes are referenced are relative to the HTML file you are authoring. If you include an include from another include, that path will need to be prefixed with `../` accordingly._

Want to know how to get the most out of twig? [Check out the documentation](http://twig.sensiolabs.org/documentation).

*Note: Init uses [twig.js](https://github.com/justjohn/twig.js/wiki) which is an implementation of the Twig PHP templating language, so some features in the documentation may not be available. Check the [implementation support for twig.js](https://github.com/justjohn/twig.js/wiki/Implementation-Notes) to verify feature support.*

#### Accessibility
When developing we should be aware of how our sites preform for users with accessibility needs. Our sites should be level AA compliant, refer to [Accessibility Checklist](http://webaim.org/standards/wcag/checklist) and [Some best practices for accessibility](https://www.webaccessibility.com/best_practices.php) for more information on level AA. We recommend using these tools to help check the accessibility of sites:

* [Cythina Says](http://www.cynthiasays.com) allows users to test individual pages on their website and provides feedback in a reporting format that is clear and easy to understand.
* [Wave Chrome Extension](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh?hl=en-US) is a google extension that provides visual feedback about the accessibility of your web content by injecting icons and indicators into your page.
* [Contrast Checker](http://webaim.org/resources/contrastchecker) is a great tool to test the contrast of text to background within your website
* [ChromeVox screenreader](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) is an extension that is a screenreader allowing you to understand how your site will perform. Please refer to [How to use ChromeVox](http://www.chromevox.com) for more information on how to use ChromeVox.

##### Aria Basics
[WAI-ARIA](https://www.w3.org/TR/WCAG20), the **Accessible Rich Internet Applications** Suite, defines a way to make Web content and Web applications more accessible to people with accessibility needs. For background on ARIA and extensive examples on how and where to use them, refer to the [ARIA in HTML](https://specs.webplatform.org/html-aria/webspecs/master) page. For practical examples of working with ARIA can be found [here](http://heydonworks.com/practical_aria_examples) and information on browser support for the ARIA tags can be found [here](http://caniuse.com/#feat=wai-aria).

The following ARIA tags are the baseline accessibility tags we recommend using while writing your HTML. Each will have a markup example on its use.

* `role="navigation":` A collection of navigational elements (usually links) for navigating the document or related documents.

```html
<nav role="navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Landing Page</a></li>
    <li><a href="#">Inner Page</a></li>
  </ul>
</nav>
```

_Note: the `<nav>` element is a HTML 5 element that is not supported in all browsers, so putting the `role="navigation` makes this backwards compatible_

* `role="menu":` A type of widget that offers a list of choices to the user.
* `role="menuitem":` An option in a group of choices contained by a menu.

```html
<ul role="menu">
  <li><a href="#" role="menuitem">Sub Menu</a></li>
  <li><a href="#" role="menuitem">Sub Menu</a></li>
  <li><a href="#" role="menuitem">Sub Menu</a></li>
</ul>
```

* `aria-haspopup="true":` Indicates that the element has a popup context menu or sub-level menu.
* `aria-expanded="false:` Indicates that the element is expanded or closed.

```html
<a aria-haspopup="true">Menu Item</a>
<ul class="sub-menu" aria-expanded="false">
  <li><a>Sub Menu Item</a></li>
  <li><a>Sub Menu Item</a></li>
  <li><a>Sub Menu Item</a></li>
</ul>
```

_Note: `aria-expanded="false"` should be changed to `true` when javascript shows the .sub-menu_
_Note: this aria tag should only be used for a hidden menu_
_Note: the `role="menu"` and `role="menuitem"` have been omitted from this example for clarity purposes_

* `role="main":` The main content of a document.

```html
<div role="main">
  <h1>Page title</h1>
  <p>Page description</p>
  ...
</div>
```

* `role="tab":` A grouping label providing a mechanism for selecting the tab content that is to be rendered to the user.
* `role="tablist":` A list of tab elements, which are references to tabpanel elements.
* `role="tabpanel":` A container for the resources associated with a tab, where each tab is contained in a tablist.
* `aria-selected="true":` Sets or retrieves the selection state of this element.

```html
<div>
  <ul role="tablist">
    <a role="tab" aria-selected="true">Click here to change tabs</a>
  </ul>
  <div role="tabpanel">
    <p>This is the tab content that will show when the tab is clicked</p>
  </div>
</div>
```

_Note: `aria-selected="true":` should be changed to `false` when the javascript fires (the new active tab should get the new `true)_

* `role="button":` An input that allows for user-triggered actions when clicked or pressed.

```html
<a role="button">This Link is a Button</a>
```

##### `hidden` helper class
Init launches with a `hidden` helper class that will help hide the content of a linked icon (for example an arrow that moves a carousel). To makes this element accessible you will need to add text within the element. To prevent this from breaking the layout we can add the class `hidden` to remove the text from the DOM visually while still allowing a screenreader to access it. The following is an example of use:

```html
<a class="hidden icon-arrow-l">View the next slide</a>
```

The text "View the next slide" will be moved off screen visually but the markup will be semantically correct.

#### Writing Sass
##### Sass Structure
Your styles live in the `app/styles/sass` folder. This folder is organized atomically:

* `screen.scss`: This contains globbing patterns that `@include` tools and partials contained in the following folders
* `0_utility/`: This contains font, helper, mixin, and variable declarations.
* `1_core/`: All bare (classless) HTML is styled in the `html-elements` folder. Icons are specified in the `_icons.scss` partial and the site's grid system is specified in the `_layout.scss` partial.
* `2_pieces/`: This is where your "Atoms" live.
* `3_components/`: This is where your "Molecules" live.
* `4_regions/`: This is where your "Organisms" live.
* `5_pages/`: This is where your "Layouts" live.

##### Using the Grid
###### Susy Defaults
Init comes with a customized version of Susy grid that gives more control with responsive layouts. The Susy default object can be found in `app/styles/1_core/_grid.scss` and default grid can be viewed by going to the 'Grid Structure' page on your localhost. The default Susy settings Init uses are:

```css
$susy: (
  columns: 12,
  global-box-sizing: border-box,
  gutters:$spacing-unit/12rem
);
```

_Note: Uncomment the `debug{}` to apply the columns
_Note: Refer to [Susy Settings](http://susydocs.oddbird.net/en/latest/settings) for information on Init's default settings_

###### Grid Classes
Init's grid on compile will provide a couple of helpful grid classes by default:

* `span-#`: This is the standard Susy classes. For example `span-4`.
* `span-#.center`: The `span-#` will automatically have a `center` modifier class associated with them. For example `span-4.center`.
* `push-#`: This is the standard Susy [Push](http://susydocs.oddbird.net/en/latest/toolkit/#pre) modifier. The number value will be the amount of columns the element is pushed to the right. For example `push-4`.
* `pull-#`: This is the standard Susy [Pull](http://susydocs.oddbird.net/en/latest/toolkit/#pull) modifier. The number value will be the amount of columns the element is pushed to the left. For example `pull-4`.
* `span-#of#`: This is another version of class syntax that the grid by default will support. For example `span-1of2`.
* `span-#of#.center`: The `span-#of#` will automatically have a `center` modifier class associated with them. For example `span-1of2.center`.

###### Grid Classes with Responsive Modifiers
These classes and behavior are largely relatively default Susy. Init's grid system has been updated to be more robust for responsive development.
By default, Init's grid will compile with responsive modifiers that will alter the grid by targeting certain breakpoint. The breakpoints are defined at the top of the `_grid.scss` file in the `$breakpoint-has-widths` list. Init's default breakpoints options are `('mobile', 'tablet', 'desktop')`. Upon sass compile these list values will be used to create the grid "@" modifiers. For example, to change a column's width to span 4 columns on desktop and higher we just need to add the class `span-4@desktop`.

_Note: We develop mobile first, so all the breakpoints will reflect outward from mobile_

Init's grid on compile will provide a couple of helpful grid classes by default:

* `span-#@BREAKPOINT`: This is the standard Susy classes. For example `span-4` on sizes larger than the BREAKPOINT.
* `span-#@BREAKPOINT.center`: The `span-#` will automatically have a `center` modifier class associated with them. For example `span-4.center` on sizes larger than the BREAKPOINT.
* `push-#@BREAKPOINT`: This is the standard Susy [Push](http://susydocs.oddbird.net/en/latest/toolkit/#pre) modifier. The number value will be the amount of columns the element is pushed to the right. For example `push-4` on sizes larger than the BREAKPOINT.
* `pull-#@BREAKPOINT`: This is the standard Susy [Pull](http://susydocs.oddbird.net/en/latest/toolkit/#pull) modifier. The number value will be the amount of columns the element is pushed to the left. For example `pull-4` on sizes larger than the BREAKPOINT.
* `span-#of#@BREAKPOINT`: This is another version of class syntax that the grid by default will support. For example `span-1of2` on sizes larger than the BREAKPOINT.
* `span-#of#@BREAKPOINT.center`: The `span-#of#` will automatically have a `center` modifier class associated with them. For example `span-1of2.center` on sizes larger than the BREAKPOINT.

_Note: In the `_grid.scss` there is a `$suffix` variable that will disable the responsive modifiers on compile. By default it is set to `true` that will include it in the compiled code, to remove this feature update this value to `false` (or '')_

_Note: There is a `.remove-center` class that can be added to markup or extended in CSS to overwrite the `.center`_

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
Make sure you've installed _ALL_ dependencies specified above. Also, make sure you have up-to-date versions of Node.

#### Why is Gulp not picking up on changes that I made to a file?
The `watch` task only picks up on changes made to files that existed when the task was started. When you edit a Gulp task, a config file, a twig `json` file, or add any new file to the `app` folder, you must stop and restart Gulp.
