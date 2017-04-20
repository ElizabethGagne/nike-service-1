'use strict';

var path = require('path'),
    shelljs = require('shelljs'),
    _ = require('lodash'),
    crypto = require('crypto'),
    chalk = require('chalk');

module.exports = {
    askForOpts
};

function decapitaize(str) {
    str = str == null ? '' : String(str);
    return str.charAt(0).toLowerCase() + str.slice(1);
}

function askForOpts() {
    if (this.existingProject) return;

    var done = this.async(); 
    configBusiness.call(this, done);
}

function configBusiness(done) {

    var prompts = [
        {
            type: 'input',
            name: 'name',
            validate: function (input) {
                if (!(/^([a-zA-Z0-9_]*)$/.test(input))) {
                    return 'Your field name cannot contain special characters';
                } else if (input == '') {
                    return 'Your field name cannot be empty';
                } else if (input.charAt(0) != input.charAt(0).toUpperCase()) {
                    return 'Your name must start with a upper case letter';
                }
                return true;
            },
            message: 'What is the name of the Data object you would like to create?'
        },
        {
            type: 'list',
            name: 'generatebusiness',
            message: 'Do you want to generate the Business tier?',
            choices: [
                {
                    value: 'yes',
                    name: 'Yes'
                },
                {
                    value: 'no',
                    name: 'No'
                }
            ],
            default: 0
        }
    ];
    this.prompt(prompts).then(function (props) {
        this.name = props.name;
        if (props.generatebusiness == 'no') {
            this.stackInfo["business"] =    { 'generate':'no'};
            this.stackInfo["facade"] =    { 'generate':'no'};
            this.stackInfo["rest"] =    { 'generate':'no'};
            done();
        } else {
            this.stackInfo["business"] =    { 'generate':'yes'};
            getBusinessCrudOptions.call(this, done);
        } 
    }.bind(this));
}

function getBusinessCrudOptions(done) {
    var prompts = [
        {
            type: 'checkbox',
            name: 'businessCrudList',
            message: 'What Business crud ops do you want to do?',
            choices: [
                {
                    value: 'save',
                    name: 'Save'
                },
                {
                    value: 'read',
                    name: 'Read'
                },
                {
                    value: 'delete',
                    name: 'Delete'
                }
            ],
            default: 0
        }
    ];
    this.prompt(prompts).then(function (props) {
        this.saveBusinessMethod = false;
        this.readBusinessMethod = false;
        this.deleteBusinessMethod = false;

        if (props.businessCrudList.indexOf('save') > -1) {
            this.saveBusinessMethod = true;
        }
        
        if (props.businessCrudList.indexOf('read') > -1) {
            this.readBusinessMethod = true;
        }

        if (props.businessCrudList.indexOf('delete') > -1) {
            this.deleteBusinessMethod = true;
        }
        configFacade.call(this, done);
    }.bind(this));
}

function configFacade(done) {
    var prompts = [
        {
            type: 'list',
            name: 'generateFacade',
            message: 'Do you want to generate the Facade tier?',
            choices: [
                {
                    value: 'yes',
                    name: 'Yes'
                },
                {
                    value: 'no',
                    name: 'No'
                }
            ],
            default: 0
        }
    ];
    this.prompt(prompts).then(function (props) {
        if (props.generateFacade == 'no') {
            this.stackInfo["facade"] =    { 'generate':'no'};
            this.stackInfo["rest"] =    { 'generate':'no'};
            done();
        } else {
            this.stackInfo["facade"] =    { 'generate':'yes'};
            getFacadeCrudOptions.call(this, done);

            console.log(chalk.green('5'));
        } 
    }.bind(this));
}

function getFacadeCrudOptions(done) {
    var prompts = [
        {
            type: 'checkbox',
            name: 'facadeCrudList',
            message: 'What Facade crud ops do you want to do?',
            choices: [
                {
                    value: 'save',
                    name: 'Save'
                },
                {
                    value: 'read',
                    name: 'Read'
                },
                {
                    value: 'delete',
                    name: 'Delete'
                }
            ],
            default: 0
        }
    ];
    this.prompt(prompts).then(function (props) {
        this.saveFacadeMethod = false;
        this.readFacadeMethod = false;
        this.deleteFacadeMethod = false;

        if (props.facadeCrudList.indexOf('save') > -1) {
            this.saveFacadeMethod = true;
        }
        
        if (props.facadeCrudList.indexOf('read') > -1) {
            this.readFacadeMethod = true;
        }

        if (props.facadeCrudList.indexOf('delete') > -1) {
            this.deleteFacadeMethod = true;
        }
        configRest.call(this, done);
    }.bind(this));
}

function configRest(done) {
    var prompts = [
        {
            type: 'list',
            name: 'generateRest',
            message: 'Do you want to generate the Rest tier?',
            choices: [
                {
                    value: 'yes',
                    name: 'Yes'
                },
                {
                    value: 'no',
                    name: 'No'
                }
            ],
            default: 0
        }
    ];
    this.prompt(prompts).then(function (props) {
        if (props.generateRest == 'no') {
            this.stackInfo["rest"] =    { 'generate':'no'};
            done();
        } else {
            this.stackInfo["rest"] =    { 'generate':'yes'};
            getRestCrudOptions.call(this, done);    
        } 
    }.bind(this));
}

function getRestCrudOptions(done) {
    var prompts = [
        {
            type: 'checkbox',
            name: 'restCrudList',
            message: 'What ReST crud ops do you want to do?',
            choices: [
                {
                    value: 'post',
                    name: 'POST'
                },
                {
                    value: 'put',
                    name: 'PUT'
                },
                {
                    value: 'get',
                    name: 'GET'
                },
                {
                    value: 'delete',
                    name: 'DELETE'
                }
            ],
            default: 0
        }
    ];
    this.prompt(prompts).then(function (props) {
        this.getRestMethod = false;
        this.postRestMethod = false;
        this.putRestMethod = false;
        this.deleteRestMethod = false;

        if (props.restCrudList.indexOf('post') > -1) {
            this.postRestMethod = true;
        }
        
        if (props.restCrudList.indexOf('put') > -1) {
            this.putRestMethod = true;
        }

        if (props.restCrudList.indexOf('get') > -1) {
            this.getRestMethod = true;
        }

        if (props.restCrudList.indexOf('delete') > -1) {
            this.deleteRestMethod = true;
        }
        done();
    }.bind(this));
}