# ng-bulma
[![Build Status](https://travis-ci.org/skamenetskiy/ng-bulma.svg?branch=master)](https://travis-ci.org/skamenetskiy/ng-bulma)
[![npm](https://img.shields.io/npm/v/ng-bulma.svg)](https://www.npmjs.com/package/ng-bulma)
[![Bower](https://img.shields.io/bower/v/ng-bulma.svg)](https://img.shields.io/bower/v/ng-bulma.svg)

## Demo
[https://skamenetskiy.github.io/ng-bulma/](https://skamenetskiy.github.io/ng-bulma/)

## Installation
ng-bulma can be installed using popular package managers or using CDN

### Step 1: Include the library

#### npm
```
npm install --save ng-bulma
```

#### bower
```
bower install --save ng-bulma
```

#### CDN
```html
<script src="https://cdn.rawgit.com/skamenetskiy/ng-bulma/master/dist/bulma.min.js"></script>
```

### Step 2: Include main bulma component into your html
```html
<body ng-app="app">
    <!-- YOUR CODE -->
    <bulma></bulma>
</body>
```

## Documentation
### bulma.module
```javascript
angular
    .module('bulma', [
        'bulma.modal',
        'bulma.progress'
    ]);
```

bulma is the main module which includes the ```<bulma/>``` component and the following dependencies:
- bulma.modal
- bulma.progress

### bulma.service
The ```bulma``` service is accessible through the `bulma` argument