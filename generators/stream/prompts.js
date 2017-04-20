'use strict';

var path = require('path'),
    shelljs = require('shelljs'),
    _ = require('lodash'),
    crypto = require('crypto');

module.exports = {
    askForStreamOpts
};

function decapitaize(str) {
    str = str == null ? '' : String(str);
    return str.charAt(0).toLowerCase() + str.slice(1);
}

function askForStreamOpts() {
    if (this.existingProject) return;

    var done = this.async();
    var getNumberedQuestion = this.getNumberedQuestion.bind(this);
    var applicationType = this.applicationType;
    var questions = 10;
    var prompts = [
        {
            type: 'input',
            name: 'groupName',
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your group name cannot contain special characters or a blank space, using the default name instead';
            },
            message: '(1/' + questions + ') What is the group name of your application?',
            default: 'test'
        },
        {
            type: 'list',
            name: 'channelType',
            message: '(2/' + questions + ') What kind of message endpoint would you like to create?',
            choices: [
                {
                    value: 'sink',
                    name: 'Sink'
                },
                {
                    value: 'source',
                    name: 'Source'
                },
                {
                    value: 'processor',
                    name: 'Processor'
                }
            ],
            default: 0
        },
        {
            when: function (response) {
                return response.channelType == 'sink' || response.channelType == 'processor';
            },
            type: 'input',
            name: 'sinkName',
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your name cannot contain special characters or a blank space, using the default name instead';
            },
            message: '(3/' + questions + ') What do you want to call the input message queue?'
            
        },
        {
            when: function (response) {
                return response.channelType == 'sink' || response.channelType == 'processor';
            },
            type: 'input',
            name: 'sinkDto',
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your name cannot contain special characters or a blank space, using the default name instead';
            },
            message: '(4/' + questions + ') What is the Sink message object called?'
            
        },
        {
            when: function (response) {
                return response.channelType == 'source' || response.channelType == 'processor';
            },
            type: 'input',
            name: 'sourceName',
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your name cannot contain special characters or a blank space, using the default name instead';
            },
            message: '(5/' + questions + ') What do you want to call the output message queue?'
            
        },
        {
            when: function (response) {
                return response.channelType == 'source' || response.channelType == 'processor';
            },
            type: 'input',
            name: 'sourceDto',
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your name cannot contain special characters or a blank space, using the default name instead';
            },
            message: '(6/' + questions + ') What is the Source message object called??'
            
        },
        {
            when: function (response) {
                return response.channelType == 'source';
            },
            type: 'list',
            name: 'generateRest',
            message: '(7/' + questions + ') Do you want a Rest endpoint generated?',
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
            when: function (response) {
                return response.channelType == 'sink';
            },
            type: 'list',
            name: 'generateWebSocket',
            message: '(8/' + questions + ') Do you want a Web Socket generated?',
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
            when: function (response) {
                return response.generateWebSocket == 'yes';
            },
            type: 'input',
            name: 'stompEndpoint',
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your stomp cannot contain special characters or a blank space, using the default name instead';
            },
            message: '(9/' + questions + ') What is the Stomp endpoint to be called?'
            
        },
        {
            when: function (response) {
                return response.generateWebSocket == 'yes';
            },
            type: 'input',
            name: 'brokerName',
            validate: function (input) {
                if (/^([a-zA-Z0-9_]*)$/.test(input)) return true;
                return 'Your stomp cannot contain special characters or a blank space, using the default name instead';
            },
            message: '(10/' + questions + ') What is the broker name to be?'
            
        }
    ];

    this.prompt(prompts).then(function (props) {
        
        this.groupName          = props.groupName;
        this.channelType        = props.channelType;
        this.sinkName           = props.sinkName;
        this.sourceName         = props.sourceName;
        this.generateRest       = props.generateRest;
        this.generateWebSocket  = props.generateWebSocket;
        this.stompEndpoint      = props.stompEndpoint;
        this.brokerName         = props.brokerName;

        this.sinkDtoClass       = _.capitalize(props.sinkDto);
        this.sinkDtoInstance    = decapitaize(props.sinkDto)
        this.sourceDtoClass     = _.capitalize(props.sourceDto);
        this.sourceDtoInstance   = decapitaize(props.sourceDto);
        this.entityClass       = _.capitalize(props.groupName);
        this.entityInstance     = decapitaize(props.groupName);
        

        done();
    }.bind(this));
}
