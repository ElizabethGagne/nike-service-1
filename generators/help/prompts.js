'use strict';

var path = require('path'),
    shelljs = require('shelljs'),
    _ = require('lodash'),
    crypto = require('crypto'),
    chalk = require('chalk');

module.exports = {
    askForOpts
};

function askForOpts() {
    var done = this.async();
    var prompts = [
        {
            type: 'list',
            name: 'topic',
            message: 'What would you like to know more about?',
            choices: [
                {
                    value: 'start',
                    name: '(yo kar-boot) for initial project creation'
                },
                {
                    value: 'datastore',
                    name: '(kar-boot:datastore) for generating and configuring the project with various types of datastores.'
                },
                {
                    value: 'data',
                    name: '(kar-boot:data) for generating entities, dtos, and repository objects'
                },
                {
                    value: 'stack',
                    name: '(kar-boot:stack) for generating the business, facade, and rest objects.'
                },
                {
                    value: 'stream',
                    name: '(kar-boot:stream) for generating Kafka, websockets, and rest endpoints'
                }
            ],
            default: 0
        }
    ];
    this.prompt(prompts).then(function (props) {
        this.topic               = props.topic;    
        done();
    }.bind(this));
}
