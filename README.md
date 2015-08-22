Work in progress for JS13k.

* Title unknown.
* The theme is precarious.

Developing
----------------

First you need to ensure you've got your tools installed:

* Ensure you're in a Unixlike environment (Windows is unlikely to work).
* `npm install -g browserify uglify-js beefy`
* Run `npm watch` to get started.

The watch task uses the node `watch` module for platform agnosticism, and runs a
`beefy` server so you don't get out-of-date Browserify builds.
