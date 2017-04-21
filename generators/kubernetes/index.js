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

const KubernetesGenerator = generator.Base.extend({});
util.inherits(KubernetesGenerator, BaseGenerator);

/* Constants used throughout */
const constants = require('../generator-constants');

module.exports = KubernetesGenerator.extend({
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
            this.log(chalk.white(`${chalk.bold('⎈')} [BETA] Welcome to the JHipster Kubernetes Generator ${chalk.bold('⎈')}`));
            this.log(chalk.white(`Files will be generated in folder: ${chalk.yellow(this.destinationRoot())}`));
        },

        checkDocker() {
            if (this.skipChecks) return;
            const done = this.async();

            shelljs.exec('docker -v', { silent: true }, (code, stdout, stderr) => {
                if (stderr) {
                    this.log(`${chalk.yellow.bold('WARNING!')} Docker version 1.10.0 or later is not installed on your computer.\n` +
                        '         Read http://docs.docker.com/engine/installation/#installation\n');
                } else {
                    const dockerVersion = stdout.split(' ')[2].replace(/,/g, '');
                    const dockerVersionMajor = dockerVersion.split('.')[0];
                    const dockerVersionMinor = dockerVersion.split('.')[1];
                    if (dockerVersionMajor < 1 || (dockerVersionMajor === 1 && dockerVersionMinor < 10)) {
                        this.log(`${chalk.yellow.bold('WARNING!')} Docker version 1.10.0 or later is not installed on your computer.\n` +
                            `         Docker version found: ${dockerVersion}\n` +
                            '         Read http://docs.docker.com/engine/installation/#installation\n');
                    }
                }
                done();
            });
        },

        checkKubernetes() {
            if (this.skipChecks) return;
            const done = this.async();

            shelljs.exec('kubectl version', { silent: true }, (code, stdout, stderr) => {
                if (stderr) {
                    this.log(`${chalk.yellow.bold('WARNING!')} kubectl 1.2 or later is not installed on your computer.\n` +
                      'Make sure you have Kubernetes installed. Read http://kubernetes.io/docs/getting-started-guides/binary_release/\n');
                }
                done();
            });
        },

        loadConfig() {
            this.directoryPath = this.config.get('directoryPath');
            this.datastore = this.config.get('datastore');
            this.jwtSecretKey = this.config.get('jwtSecretKey');
            this.dockerRepositoryName = this.config.get('dockerRepositoryName');
            this.baseName = this.config.get('baseName');
            this.dasherizedBaseName = _.kebabCase(this.baseName);
            this.serverPort = this.config.get('serverPort');


            if (this.directoryPath !== undefined) {
                this.log('\nFound .yo-rc.json config file...');
            }
        }
    },

    prompting: {
        askForPath: prompts.askForPath,
        askForAdminPassword: prompts.askForAdminPassword,
        askForDockerRepositoryName: prompts.askForDockerRepositoryName
    },

    configuring: {
        insight() {
            const insight = this.insight();
            insight.trackWithEvent('generator', 'kubernetes');
        },

        configureImageNames() {
            const originalImageName = this.dasherizedBaseName.toLowerCase();
            const targetImageName = this.dockerRepositoryName ? `${this.dockerRepositoryName}/${originalImageName}` : originalImageName;
            this.targetImageName = targetImageName;
        },

        saveConfig() {
            this.config.set('directoryPath', this.directoryPath);
            this.config.set('dockerRepositoryName', this.dockerRepositoryName);
        }
    },

    writing: writeFiles(),

    end() {
        this.log(`\n${chalk.bold.green('Kubernetes configuration successfully generated!')}`);

        this.log(`${chalk.yellow.bold('WARNING!')} You will need to push your image to a registry.`);

        this.log('\nYou can deploy all app by running: ');
        this.log(`  ${chalk.cyan(`kubectl apply -f kubernetes`)}`);

    }
});
