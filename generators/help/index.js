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


var KarMsHelpGenerator = generators.Base.extend({});

util.inherits(KarMsHelpGenerator, scriptBase);

module.exports = KarMsHelpGenerator.extend({
  constructor: function () {
      generators.Base.apply(this, arguments);
  },

  initializing: {
        displayLogo: function () {
            this.printLogo('HELP');
        }
  },

  prompting: {
        askForOpts: prompts.askForOpts
  },

  writing: writeFiles()
  
});
