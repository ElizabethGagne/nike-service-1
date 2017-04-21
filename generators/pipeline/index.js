'use stric';
const generator = require('yeoman-generator');
const chalk = require('chalk');
const shelljs = require('shelljs');
const crypto = require('crypto');
const _ = require('lodash');
const util = require('util');
const prompts = require('./prompts');
const writeFiles = require('./files').writeFiles;
const BaseGenerator = require('../generator-base');

const PipelineGenerator = generator.Base.extend({});
util.inherits(PipelineGenerator, BaseGenerator);

/* Constants used throughout */
const constants = require('../generator-constants');

module.exports = PipelineGenerator.extend({
    constructor: function (...args) { // eslint-disable-line object-shorthand
        generator.Base.apply(this, args);

        // This adds support for a `--skip-checks` flag
        this.option('skip-checks', {
            desc: 'Check the status of the required tools',
            type: Boolean,
            defaults: false
        });

        this.skipChecks = this.options['skip-checks'];
        this.configOptions = this.options.configOptions || {};
        this.baseName = this.configOptions.baseName;
        this.dasherizedBaseName = _.kebabCase(this.baseName);
    },

    initializing: {
        sayHello() {
            this.log(chalk.white(`${chalk.bold('⎈')} [BETA] Welcome to Jenkins Pipeline Generator ${chalk.bold('⎈')}`));
            this.log(chalk.white(`Files will be generated in folder: ${chalk.yellow(this.destinationRoot())}`));
        },

        loadConfig() {
            this.directoryPath = this.config.get('directoryPath');
            this.datastore = this.config.get('datastore');
            this.jwtSecretKey = this.config.get('jwtSecretKey');
            this.dockerRepositoryName = this.config.get('dockerRepositoryName');
            this.baseName = this.config.get('baseName');
            this.dasherizedBaseName = _.kebabCase(this.baseName);
            this.serverPort = this.config.get('serverPort');
            this.gitURL = this.config.get('gitURL');


            if (this.directoryPath !== undefined) {
                this.log('\nFound .yo-rc.json config file...');
            }
        }
    },

    prompting: {
        askForPath: prompts.askForPath,
        askForAdminPassword: prompts.askForAdminPassword,
        askForGitRepoURL: prompts.askForGitRepoURL
    },

    configuring: {
        insight() {
            const insight = this.insight();
            insight.trackWithEvent('generator', 'pipeline');
        },

        saveConfig() {
            this.config.set('directoryPath', this.directoryPath);
            this.config.set('dockerRepositoryName', this.dockerRepositoryName);
            this.config.set('gitURL', this.gitURL);
        }
    },

    writing: writeFiles(),

    end() {
        this.log(`\n${chalk.bold.green('Jenkins Pipeline configuration successfully generated!')}`);
    }
});
