'use strict';
const util = require('util'),
    generators = require('yeoman-generator'),
    chalk = require('chalk'),
    _ = require('lodash'),
    prompts = require('./prompts'),
    scriptBase = require('../generator-base'), 
    writeFiles = require('./files').writeFiles,
    packagejs = require('../../package.json'),
    crypto = require('crypto'),
    mkdirp = require('mkdirp'); 


var KarMsKataGenerator = generators.Base.extend({});

util.inherits(KarMsKataGenerator, scriptBase);

module.exports = KarMsKataGenerator.extend({
  constructor: function () {
      generators.Base.apply(this, arguments);
  },

  initializing: {
        displayLogo: function () {
            this.printKata('Katas');
        }
  },

  prompting: {
        askForOpts: prompts.askForOpts
  },

  writing: writeFiles()
});
