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
      this.datastore = this.config.get('datastore');
      this.fields = [];
      this.fieldNamesUnderscored = ['id'];
      this.reservedWords_Java = ["ABSTRACT", "CONTINUE", "FOR", "NEW", "SWITCH", "ASSERT", "DEFAULT", "GOTO", "PACKAGE", "SYNCHRONIZED", "BOOLEAN", "DO", "IF", "PRIVATE", "THIS", "BREAK", "DOUBLE", "IMPLEMENTS", "PROTECTED", "THROW", "BYTE", "ELSE", "IMPORT", "PUBLIC", "THROWS", "CASE", "ENUM", "INSTANCEOF", "RETURN", "TRANSIENT", "CATCH", "EXTENDS", "INT", "SHORT", "TRY", "CHAR", "FINAL", "INTERFACE", "STATIC", "VOID", "CLASS", "FINALLY", "LONG", "STRICTFP", "VOLATILE", "CONST", "FLOAT", "NATIVE", "SUPER", "WHILE"];
  },

  initializing: {
        displayLogo: function () {
            this.printLogo('DTO');
        }
  },

  prompting: {
        askForDtoOpts: prompts.askForDtoOpts
  },

  configuring: {
      insight: function () {
          var insight = this.insight();
          insight.trackWithEvent('generator', 'stream');
      },

      configureGlobal: function () {
          this.packageFolder = this.packageName.replace(/\./g, '/');
      },

      saveConfig: function () {
          //this.config.set('streamscreated', true);
      }
  },

  writing: writeFiles()
  
});
