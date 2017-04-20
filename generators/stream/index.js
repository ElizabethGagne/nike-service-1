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


var KarMsStreamGenerator = generators.Base.extend({});

util.inherits(KarMsStreamGenerator, scriptBase);

module.exports = KarMsStreamGenerator.extend({
  constructor: function () {
      generators.Base.apply(this, arguments);

      this.baseName = this.config.get('baseName');
      this.packageName = this.config.get('packageName');
      //this.baseName = this.configOptions.baseName;
  },

  initializing: {
        displayLogo: function () {
            this.printLogo('STREAM');
        }
  },

  prompting: {
        askForStreamOpts: prompts.askForStreamOpts
  },

  configuring: {
      insight: function () {
          var insight = this.insight();
          insight.trackWithEvent('generator', 'stream');
      },

      configureGlobal: function () {
          // Application name modified, using each technology's conventions
          //this.angularAppName = this.getAngularAppName();
          //this.camelizedBaseName = _.camelCase(this.baseName);
          //this.dasherizedBaseName = _.kebabCase(this.baseName);
          //this.lowercaseBaseName = this.baseName.toLowerCase();
          //this.humanizedBaseName = _.startCase(this.baseName);
          this.packageFolder = this.packageName.replace(/\./g, '/');
      },

      saveConfig: function () {
          this.config.set('streamscreated', true);
          //this.config.set('baseName', this.baseName);
          //this.config.set('packageName', this.packageName);
          //this.config.set('serverPort', this.serverPort);
      }
  },

  writing: writeFiles()
  
});
