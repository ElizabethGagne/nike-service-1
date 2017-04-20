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
    var getNumberedQuestion = this.getNumberedQuestion.bind(this);
    var applicationType = this.applicationType;
    var questions = 10;
    
    var prompts = [
        {
            type: 'list',
            name: 'datastore',
            message: 'What kind of Datastore would you like to add?',
            choices: [
                {
                    value: 'jpa',
                    name: 'JPA'
                },
                {
                    value: 'elasticsearch',
                    name: 'ElasticSearch'
                },
                {
                    value: 'redis',
                    name: 'Redis'
                },
                {
                    value: 'restTemplate',
                    name: 'Rest Template'
                }
            ],
            default: 0
        }
    ];
    console.log(chalk.green('1'));
    this.datastore               = this.config.get('datastore');
    console.log(chalk.green('2'));

    if (this.datastore != null ) {
         console.log(chalk.green('You already have a datastore added to your project: ' + this.datastore));
        //cb();
    } else {
    	console.log(chalk.green('3'));
        this.prompt(prompts).then(function (props) {
        	console.log(chalk.green('4'));
            this.datastore               = props.datastore;    
            console.log(chalk.green('5'));
            done();
        }.bind(this));
    }
}
