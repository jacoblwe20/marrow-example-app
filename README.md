### Marrow Example App

This is a test app for [Marrow.js](https://github.com/jacoblwe20/marrow).

## Start up

This is a static html app. You really only need to serve up `index.html` to get this app to work. Although you can also use [Node.js](http://nodejs.org) and [Grunt](http://gruntjs.com/) to serve the files as well using `grunt server`.

## Building on

You will need [Node.js](http://nodejs.org) and [Grunt](http://gruntjs.com/) to build on this app. Then youll need to install the depedencies.

```
npm install
```

once that has finished installing everything just run

```
grunt server
```

In your terminal and the app will startup on port `9001`. If your editing the main `index.html` file make sure to edit it from `template/index.hbs`. So when the precompile task runs it will not overwrite your changes. 

## For more info 

visit [Marrow.js](https://github.com/jacoblwe20/marrow) 