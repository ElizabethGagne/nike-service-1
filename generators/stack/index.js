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


var KarMsStackGenerator = generators.Base.extend({});

util.inherits(KarMsStackGenerator, scriptBase);

module.exports = KarMsStackGenerator.extend({
  constructor: function () {
      generators.Base.apply(this, arguments);
      this.packageName  = this.config.get('packageName');
      this.datastore    = this.config.get('datastore');
      this.stackInfo    =  {};
  },

  initializing: {
        displayLogo: function () {
            this.printLogo('STACK');
        }
  },

  prompting: {
        askForOpts: prompts.askForOpts
  },

  configuring: {
      insight: function () {
          var insight = this.insight();
          insight.trackWithEvent('generator', 'datastore');
      },

      configureGlobal: function () {
          
          this.packageFolder = this.packageName.replace(/\./g, '/');
      },
      saveConfig: function () {
          this.config.set('datastore', this.datastore);
      }
  },

  writing: writeFiles()
  
});
