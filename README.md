# New features
   - ## Scroll to date softly

      sroll to a specific date position in the gantt

      ## Argument
      ```
        @param {moment} date moment to scroll to.

        @param {integer} milliseconds of duration rate of time of the animation (default 200).
      ```
     ## Usage

          const date = moment()
          $scope.api.scroll.toDateSoftly(date)
          // or
          $scope.api.scroll.toDateSoftly(date, 300)

   - ## Recycler Plugin Syncs scrolls with Gantt Side and Background
   - ## Go to Row for Recycler Plugin
      Go to a specific row of the recycler plugin

     ## Usage

          const predicate = (row) => row.model.id === id)
          $scope.api.recycler.goToRow(predicate)

   - ## Recycler plugin for grid side
      Display a tree hierarchy with multiple columns support... This plugins support high ammount of data because is using [md-virtual-repeat](https://material.angularjs.org/latest/demo/virtualRepeat) from angular-material

     ## Dependency
      - angular-material: 1.1.5

     ## Usage

          angular.module('myApp', ['gantt', 'gantt.recycler']);

      <!-- -->

        <div gantt>
          <gantt-recycler template-rows="templateRows">
          </gantt-recycler>
        </div>

      ## Model

        Rows can specify a list of children using `children` property and/or a parent using `parent` property. Name and id
        can be used to define the hierarchy. **Just like Tree plugin**

            var data = [
              {name: 'Parent', children: ['One', 'Two', 'Three']},
              {name: 'One', tasks: [...]},
              {name: 'Two', tasks: [...]},
              {name: 'Three', tasks: [...]},
            ]

        <!-- -->

      ## Attributes
        - ### template-rows
            Here you can define the structure of your grid-side using this
            structure

              $scope.templateRows = [{
                type: 'tree', // To make this column a tree
                headerContent: '<div> title </div>' // Support html,
                width: '10px' // Width to css-grid, default to 100px
              }, {
                type: 'column',
                classes: ['some-cool-class'], // pass class to style this column
                headerContent: '<div> From </div>',
                content: '<some-from-component></some-from-component>',
                width: '10px' // Width to css-grid
              }, {
                type: 'column',
                classes: ['some-cool-class'],
                headerContent: '<div> To </div>',
                content: '<some-to-component></some-to-component>' ,
                width: '10px'
              }

          <!-- -->


   - ## Less watchers using one-time binding
   - ## Extra scale time for gantt columns
       Use extraScaleTime to scale symmetricaly the headerScale

            // SomeComponent.js
            extraScaleTime: {
                time: 3 // In Hours
            }

            // SomeTemplate.js
            <div
                gantt
                extra-scale-time="$scope.extraScaleTime"
                >
            </div>
    - ## No draggable attribute
        In order to avoid a task trigger the movable directive, you can use `no-draggable` attribute

                tasks: [
                    { content: '<span id="span"> task1 <button id="hola" no-draggable>hola</button> </span>'
                    }
                ]


# angular-gantt
[![npm version](http://img.shields.io/npm/v/angular-gantt.svg?style=flat)](https://npmjs.org/package/angular-gantt)
[![Build status](http://img.shields.io/travis/angular-gantt/angular-gantt.svg?style=flat)](https://travis-ci.org/angular-gantt/angular-gantt)
[![Coverage Status](https://img.shields.io/coveralls/angular-gantt/angular-gantt.svg?style=flat)](https://coveralls.io/r/angular-gantt/angular-gantt)
[![Documentation](https://readthedocs.org/projects/angular-gantt/badge/?style=flat)](https://angular-gantt.readthedocs.org)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angular-gantt/angular-gantt?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![HuBoard](https://img.shields.io/badge/Hu-Board-7965cc.svg)](https://huboard.com/angular-gantt/angular-gantt)

## Gantt chart component for AngularJS

[angular-gantt](http://www.angular-gantt.com) provides a gantt chart component to your [AngularJS](https://angularjs.org/) application.

<br/>

![Angular Gantt](docs/img/angular-gantt.png)

## Try now

Try angular-gantt now using the [Demo Application](http://www.angular-gantt.com/demo).

[Unstable Demo Application](http://rawgit.com/angular-gantt/angular-gantt/develop/demo.dist/index.html) is also available.
It is build against [github develop](https://github.com/angular-gantt/angular-gantt) branch, and allows to preview
bleeding edge features, but may be very unstable.

You can even try the API using Plunker sandbox, with [XYYkD8tf5b2LQs5kL5nx](http://plnkr.co/XYYkD8tf5b2LQs5kL5nx)
(latest release) and [cNqoyX](http://plnkr.co/cNqoyX) (develop branch).

## Features
- Two-way data binding between model and view.
- Advanced calendar support to define holidays and working hours.
- Each task and row has its own properties and behavior.
- Rows and tasks can be sorted and filtered.
- Plugin architecture to add custom features and hooks.
- API to listen events and call methods from your controller.

## Docs

Docs are built using [MkDocs](http://www.mkdocs.org/) and available at
[angular-gantt website](http://www.angular-gantt.com) (stable) and [ReadTheDocs](http://angular-gantt.readthedocs.org/en/latest/)
(develop).

## Bower

angular-gantt is available through [bower](http://bower.io/) and [npm](https://www.npmjs.org/package/angular-gantt).

    npm install angular-gantt
    bower install angular-gantt

or

    npm install https://github.com/angular-gantt/angular-gantt/tarball/develop
    bower install angular-gantt#develop

## CDNs

You can find released version on CDNs.

[jsDelivr](http://www.jsdelivr.com/)

    //cdn.jsdelivr.net/npm/angular-gantt@latest/dist/angular-gantt.min.js
    //cdn.jsdelivr.net/npm/angular-gantt@latest/dist/angular-gantt.min.css

[CDNjs](http://www.cdnjs.com/) (Replace `<version>` with latest github tag)

    //cdnjs.cloudflare.com/ajax/libs/angular-gantt/<version>/angular-gantt.min.js
    //cdnjs.cloudflare.com/ajax/libs/angular-gantt/<version>/angular-gantt.min.css

## Download

[Latest released version](https://github.com/angular-gantt/angular-gantt/releases/latest) is available to
[download](https://github.com/angular-gantt/angular-gantt/releases/latest) on Github and is the recommended and stable version.

[Develop branch version](https://github.com/angular-gantt/angular-gantt/tree/develop) contains bleeding edge features, but may be very unstable.

## Dependencies
- [AngularJS](https://angularjs.org) >= 1.3
- [momentJS](http://momentjs.com/)

Note: Some plugins require additional dependencies.

## The MIT License

Copyright (c) 2017 Marco Schweighauser, Rémi Alvergnat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
