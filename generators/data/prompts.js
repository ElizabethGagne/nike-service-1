'use strict';

var path = require('path'),
    shelljs = require('shelljs'),
    _ = require('lodash'),
    chalk = require('chalk'),
    crypto = require('crypto');

module.exports = {
    askForDtoOpts
};

function decapitaize(str) {
    str = str == null ? '' : String(str);
    return str.charAt(0).toLowerCase() + str.slice(1);
}

function askForDtoOpts() {
    var done = this.async();
    setUpAdditionalInfoForSelectedDataStore.call(this,done);
}

function setUpAdditionalInfoForSelectedDataStore(done) {
    var questions = 1;
    var datastore =  this.datastore;

    console.log('Datastore == ' + this.datastore);

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
            when: function (response) {
                return datastore == 'elasticsearch';
            },
            type: 'input',
            name: 'indexname',
            validate: function (input) {
                if (!(/^([a-zA-Z0-9_]*)$/.test(input))) {
                    return 'Your field name cannot contain special characters';
                } else if (input == '') {
                    return 'Your field name cannot be empty';
                } else if (input.charAt(0) == input.charAt(0).toUpperCase()) {
                    return 'Your field name cannot start with a upper case letter';
                }// else if (this.reservedWords_Java.indexOf(input.toUpperCase()) != -1) {
                //    return 'Your field name cannot contain a Java reserved keyword';
                //} else if (input == 'id' || this.fieldNamesUnderscored.indexOf(_s.underscored(input)) != -1) {
                //    return 'Your field name cannot use an already existing field name';
                //}
                return true;
            },
            message: 'What is the name of your elastic index?'
        },
        {
            type: 'list',
            name: 'createdto',
            message: 'Create the DTO?',
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
        },
        {
            type: 'list',
            name: 'createentity',
            message: 'Create the entity?',
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
        if (this.datastore == 'elasticsearch') {
            this.indexname = props.indexname;
        }
        this.createdto      = props.createdto;
        this.createentity   = props.createentity;
        askForFields.call(this, done);
    }.bind(this));
}

function askForFields(done) {
    //var getNumberedQuestion = this.getNumberedQuestion.bind(this);
    //var applicationType = this.applicationType;
    var questions = 10;
    var prompts = [
        {
            type: 'confirm',
            name: 'fieldAdd',
            message: 'Do you want to add a field to your entity?',
            default: true
        },
        {
            when: function (response) {
                return response.fieldAdd == true;
            },
            type: 'input',
            name: 'fieldName',
            validate: function (input) {
                if (!(/^([a-zA-Z0-9_]*)$/.test(input))) {
                    return 'Your field name cannot contain special characters';
                } else if (input == '') {
                    return 'Your field name cannot be empty';
                } else if (input.charAt(0) == input.charAt(0).toUpperCase()) {
                    return 'Your field name cannot start with a upper case letter';
                }// else if (this.reservedWords_Java.indexOf(input.toUpperCase()) != -1) {
                //    return 'Your field name cannot contain a Java reserved keyword';
                //} else if (input == 'id' || this.fieldNamesUnderscored.indexOf(_s.underscored(input)) != -1) {
                //    return 'Your field name cannot use an already existing field name';
                //}
                return true;
            },
            message: 'What is the name of your field?'
        },
        {
            when: function (response) {
                return response.fieldAdd == true;
            },
            type: 'list',
            name: 'fieldType',
            message: 'What is the type of your field?',
            choices: [
                {
                    value: 'String',
                    name: 'String'
                },
                {
                  value: 'Integer',
                  name: 'Integer'
                },
                {
                  value: 'Long',
                  name: 'Long'
                },
                {
                    value: 'BigDecimal',
                    name: 'BigDecimal'
                },
                {
                    value: 'DateTime',
                    name: 'DateTime'
                },
                {
                    value: 'Boolean',
                    name: 'Boolean'
                }
            ],
            default: 0
        }

    ];

    this.prompt(prompts).then(function (props) {
        if (props.fieldAdd) {
            var field = {
                fieldId: this.fieldId,
                fieldName: props.fieldName,
                fieldType: props.fieldType
                };
            this.fields.push(field);
        }
        console.log(chalk.red('=================' + _.capitalize(this.name) + '================='));
        //cb();
        if (props.fieldAdd) {
            askForFields.call(this, done);
        } else {
            done();
        }
    }.bind(this));
}
