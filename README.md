# Leaps-and-Bounds
GitHub GameOff 2019

Relatively Special Deliveries - Delivering the packages of today - tomorrow!

Thanks to Einstein’s Special Relativity, time slows down for a traveller moving at near light speed. We make use of this property of space-time, plus our expendable employees, to run your future errands!

That’s right, for only a handful of SpaceBucks, we will plunge into the far-flung future to deliver things on your behalf. Worried about forgetting your anniversary in 10 years? We’re on it! Want to send a birthday present to your great-great-great-grand daughter? Look no further!

With Relatively Special Deliveries, the future is now!

T&Cs
All trips are one-way, travelling back in time is not possible with our current understanding of physics. RSD is not responsible for any loss of goods or personnel due to cataclysmic future events.

# Maths

Time dilation is calculated using:
delta_t = delta_tau/(sqrt(1-(v^2/c^2)))
where delta_t is the time on Earth, delta_tau is the time on the rocket, v is the speed of the rocket and c is the speed of light in a vaccuum.

# Instructions

Navigate to directory with index.html

(starting project)
make a package.json
npm install
creates a package-lock.json and node_modules directory

(for running locally)
python -m SimpleHTTPServer
localhost:8000

File structure for basic game:
https://phasertutorials.com/creating-a-phaser-3-template-part-1/


# Phaser 3 Webpack Project Template

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/)
that includes hot-reloading for development and production-ready builds.

Loading images via JavaScript module `import` is also supported.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm start`.


After starting the development server with `npm start`, you can edit any files in the `src` folder
and webpack will automatically recompile and reload your server (available at `http://localhost:8080`
by default).

## Customizing Template

### Babel
You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you
want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently
targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

  ```
  "browsers": [
    ">0.25%",
    "not ie 11",
    "not op_mini all"
  ]
  ```

### Webpack
If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can
modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create
new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code
After you run the `npm run build` command, your code will be built into a single bundle located at 
`dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), 
you should be able to open `http://mycoolserver.com/index.html` and play your game.

