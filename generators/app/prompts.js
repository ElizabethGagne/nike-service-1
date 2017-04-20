'use strict';

var chalk = require('chalk');


module.exports = {
    askForApplicationType,
    askForModuleName
};

function askForApplicationType() {
    if (this.existingProject) return;

    this.applicationType = 'microservice';
    return;
}

function askForModuleName() {
    if (this.existingProject) return;

    this.askModuleName(this);
}