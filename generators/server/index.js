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


var KarMsServerGenerator = generators.Base.extend({});

util.inherits(KarMsServerGenerator, scriptBase);

module.exports = KarMsServerGenerator.extend({
  constructor: function () {
      generators.Base.apply(this, arguments);
      this.configOptions = this.options.configOptions || {};
      this.baseName = this.configOptions.baseName;
  },
  prompting: {
        askForModuleName: prompts.askForModuleName,
        askForServerSideOpts: prompts.askForServerSideOpts
  },

  configuring: {
      insight: function () {
          var insight = this.insight();
          insight.trackWithEvent('generator', 'server');
      },

      configureGlobal: function () {
          // Application name modified, using each technology's conventions
          this.angularAppName = this.getAngularAppName();
          this.camelizedBaseName = _.camelCase(this.baseName);
          this.dasherizedBaseName = _.kebabCase(this.baseName);
          this.lowercaseBaseName = this.baseName.toLowerCase();
          this.humanizedBaseName = _.startCase(this.baseName);
          this.packageFolder = this.packageName.replace(/\./g, '/');
      },

      saveConfig: function () {
          this.config.set('baseName',     this.baseName);
          this.config.set('packageName',  this.packageName);
          this.config.set('serverPort',   this.serverPort);
          this.config.set('title',        this.title);   
      }
  },

  writing: writeFiles()
  
});
