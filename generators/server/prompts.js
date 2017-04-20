'use strict';

var path = require('path'),
    shelljs = require('shelljs'),
    crypto = require('crypto');

module.exports = {
    askForModuleName,
    askForServerSideOpts
};

function askForModuleName() {
    if (this.baseName) return;
    this.askModuleName(this);
}

function askForServerSideOpts() {
    if (this.existingProject) return;

    var done = this.async();
    var getNumberedQuestion = this.getNumberedQuestion.bind(this);
    var applicationType = this.applicationType;
    var prompts = [
        {
            type: 'input',
            name: 'title',
            validate: function (input) {
                if (input == '') {
                    return 'Your field name cannot be empty';
                }
                return true;
            },
            message: 'What is the title you would like to use for this microservice? (Used for naming in Sonar)',
            store: true
        },
        {
            type: 'input',
            name: 'serverPort',
            validate: function (input) {
                if (/^([0-9]*)$/.test(input)) return true;
                return 'This is not a valid port number.';
            },
            message: 'On which port would like your server to run?',
            default: '8080',
            store: true
        },
        {
            type: 'input',
            name: 'packageName',
            validate: function (input) {
                if (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)) return true;
                return 'The package name you have provided is not a valid Java package name.';
            },
            message: 'What is your default Java package name?',
            default: 'com.mycompany.myapp',
            store: true
        }
    ];

    this.prompt(prompts).then(function (props) {
        this.packageName    = props.packageName;
        this.serverPort     = props.serverPort;
        this.title          = props.title;
        done();
    }.bind(this));
}
