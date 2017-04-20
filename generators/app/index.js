'use strict';
var util                = require('util');
var generators           = require('yeoman-generator');
var chalk               = require('chalk');
var scriptBase          = require('../generator-base');
var cleanup             = require('../cleanup')
var yosay               = require('yosay');
var packagejs           = require('../../package.json')
var prompts             = require('./prompts');
var exec                = require('child_process').exec;

var KarMsGenerator = generators.Base.extend({});

util.inherits(KarMsGenerator, scriptBase);

const constants = require('../generator-constants');


module.exports = KarMsGenerator.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.configOptions = {};
        
        this.currentQuestion = 0;
        this.totalQuestions = constants.QUESTIONS;
    },
    initializing: {
        displayLogo: function () {
            this.printLogo('INIT');
        },

        checkJava: function () {
            var done = this.async(); 
            exec('java -version', function (err, stdout, stderr) {
                if (err) {
                    this.warning('Java 8 is not found on your computer.');
                } else {
                    var javaVersion = stderr.match(/(?:java|openjdk) version "(.*)"/)[1];
                    if (!javaVersion.match(/1\.8/)) {
                        this.warning('Java 8 is not found on your computer. Your Java version is: ' + chalk.yellow(javaVersion));
                    }
                }
                done();
            }.bind(this));
        },
        validate: function () {
            
        },

        setupVars: function () {
            this.baseName = this.config.get('baseName');
        }
    },
    prompting: {
        askForApplicationType: prompts.askForApplicationType,
        askForModuleName: prompts.askForModuleName
    },
    configuring: {
        setup: function () {
            this.configOptions.baseName = this.baseName;
            this.generatorType = 'app';
            this.generatorType = 'server';
        },

        composeServer: function () {

            this.composeWith('karms:server', {
                options: {
                    'client-hook': false,
                    configOptions: this.configOptions,
                    force: this.options['force']
                }
            }, {
                local: require.resolve('../server')
            });
        }
    },

    default: {

        setSharedConfigOptions: function () {
            //this.configOptions.lastQuestion = this.currentQuestion;
        },

        insight: function () {
            var insight = this.insight();
            insight.trackWithEvent('generator', 'app');
        },

        saveConfig: function () {
            this.config.set('baseName', this.baseName);
        }
    },

    writing: {
        cleanup: function () {
            cleanup.cleanupOldFiles(this, this.javaDir, this.testDir);
        }
    },

    end: {
        afterRunHook: function () {
            
        }
    }
});
