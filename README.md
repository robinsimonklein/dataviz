# sample-project

A sample web project with webpack-encore and http-server

## Installation

First, clone the repository
```
git clone https://github.com/Hugotgot/sample-project.git
```

Then, install dependencies
```
npm install
```

## Usage
There's two empty entry files provided in this project :
- **src/js/main.js**
- **src/scss/style.scss**

That's the files you should modify and write your code in.
You should, while working, run the command Encore Watch (see below) to compile assets.

The **index.html** is in the **public** folder and that's the one you should modify (import for the compiled js and css files are already in).

## Run
### Encore
#### Watch (dev)
```
npm run encore.watch
```

#### Build 
```
npm run encore.prod
```

### HTTP-Server
```
npm run serve
```

Now, your project is accessible at http://127.0.0.1:8088 !
