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

 
var KarMsDtoGenerator = generators.Base.extend({});

util.inherits(KarMsDtoGenerator, scriptBase);

module.exports = KarMsDtoGenerator.extend({
  constructor: function () {
      generators.Base.apply(this, arguments);
      this.packageName = this.config.get('packageName');
  },

  initializing: {
        displayLogo: function () {
            this.printLogo('DATASTORE');
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
