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
    var done = this.async();
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
            message: 'What is the name of the Data object you would like to append?'
        },
        {
            type: 'input',
            name: 'fieldName',
            validate: function (input) {
                if (!(/^([a-zA-Z0-9_]*)$/.test(input))) {
                    return 'Your field name cannot contain special characters';
                } else if (input == '') {
                    return 'Your field name cannot be empty';
                } else if (input.charAt(0) == input.charAt(0).toUpperCase()) {
                    return 'Your name must start with a lower case letter';
                }
                return true;
            },
            message: 'Name of the new field you would like to find by?'
        },
        {
            type: 'list',
            name: 'fieldType',
            message: 'Field Type?',
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
                }
            ],
            default: 0
        },
        {
            type: 'list',
            name: 'appendEntity',
            message: 'Add to entity and dto?',
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
            name: 'appendRepository',
            message: 'Add to repository?',
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
            name: 'appendBusiness',
            message: 'Add to business layer?',
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
            name: 'appendFacade',
            message: 'Add to facade layer?',
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
            name: 'appendRest',
            message: 'Add to rest layer?',
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
            name: 'isPageable',
            message: 'Is pageable?',
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
        this.name               = props.name;
        this.fieldName          = props.fieldName;
        this.fieldType          = props.fieldType;
        this.appendEntity       = props.appendEntity;
        this.appendRepository   = props.appendRepository;
        this.appendBusiness     = props.appendBusiness;
        this.appendFacade       = props.appendFacade;
        this.appendRest         = props.appendRest;
        this.isPageable         = props.isPageable;

        done();
    }.bind(this));
}
