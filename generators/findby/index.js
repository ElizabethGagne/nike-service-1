'use strict';
const util = require('util'),
    generators = require('yeoman-generator'),
    _ = require('lodash'),
    prompts = require('./prompts'),
    scriptBase = require('../generator-base'), 
    writeFiles = require('./files').writeFiles,
    packagejs = require('../../package.json'); 


var KarMsFindByGenerator = generators.Base.extend({});

util.inherits(KarMsFindByGenerator, scriptBase);

module.exports = KarMsFindByGenerator.extend({
  constructor: function () {
      generators.Base.apply(this, arguments);
      this.packageName = this.config.get('packageName');
  },

  initializing: {
        displayLogo: function () {
            this.printLogo('Find By');
        }
  },

  prompting: {
        askForOpts: prompts.askForOpts
  },

  configuring: {
      configureGlobal: function () {
          this.packageFolder = this.packageName.replace(/\./g, '/');
      },

      saveConfig: function () {
          //this.config.set('streamscreated', true);
      }
  },

  writing: writeFiles()
  
});
