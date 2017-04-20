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
    doKataDocs.call(this, done);
}

function doKataDocs(done) {
    var prompts = [
        {
            type: 'list',
            name: 'dojo',
            message: 'What Dojo do you want to join?',
            choices: [
                {
                    value: 'repository',
                    name: 'Repository'
                },
                {
                    value: 'business',
                    name: 'Business'
                },
                {
                    value: 'facade',
                    name: 'Facade'
                },
                {
                    value: 'rest',
                    name: 'Rest'
                }
            ],
            default: 0
        }
    ];
    this.prompt(prompts).then(function (props) {
        this.dojo               = props.dojo;  
        selectKata.call(this, done);
    }.bind(this));
}

function selectKata(done) {
    var prompts = [];
    if (this.dojo == 'repository') {
        var prompts = [
            {
                type: 'list',
                name: 'kata',
                message: 'Setup and configuation',
                choices: [
                    {
                        value: 'repoSetUp',
                        name: '1. Setting up the environment for the repository dojos'
                    },
                    {
                        value: 'entitySetUp',
                        name: '2. Create and setup the entity'
                    },
                    {
                        value: 'repositoryKata',
                        name: '3. How to create the repository and test it.'
                    },
                    {
                        value: 'repositoryKataAddNameTest',
                        name: '4. Add a method to the repository and test it.'
                    }

                    
                ],
                default: 0
            }
        ];
    } else if (this.dojo == 'business') {
        var prompts = [
            {
                type: 'list',
                name: 'kata',
                message: 'Business Katas available',
                choices: [
                    {
                        value: 'businessKataSetup',
                        name: '1. Setting up the environment for the business dojos'
                    },
                    {
                        value: 'businessKataCreation',
                        name: '2. Create the business objects and test'
                    }

                    
                ],
                default: 0
            }
        ];
    } else if (this.dojo == 'facade') {
        var prompts = [
            {
                type: 'list',
                name: 'kata',
                message: 'Facade Katas available',
                choices: [
                    {
                        value: 'facadeSetupContinued',
                        name: '1. Setting up the katas after completing the business katas'
                    },
                    {
                        value: 'facadeSetupFromScratch',
                        name: '2. Set up the environment for the facade katas from scratch'
                    },
                    {
                        value: 'facadeInterfaceAndTestSetup',
                        name: '3. Create the interface and test harness in a TDD stype.'
                    },
                    {
                        value: 'facadeImplAndTestsPass',
                        name: '4. Create the implementation with a null result so that tests still fail.'
                    },
                    {
                        value: 'facadeJBehave',
                        name: '5. Wire in the JBehave acceptance criteria into the build.'
                    }

                ],
                default: 0
            }
        ];
    } else if (this.dojo == 'rest') {
        var prompts = [
            {
                type: 'list',
                name: 'kata',
                message: 'Facade Katas available',
                choices: [
                    {
                        value: 'restSetup',
                        name: '1. Setting up for the rest kata\'s'
                    },
                    {
                        value: 'restTestAndFail',
                        name: '2. Creating the class and unit test. Unit tests fail.'
                    },
                    {
                        value: 'restFinalImplementation',
                        name: '3. Creating the executable code to pass the unit test.'
                    }
                ],
                default: 0
            }
        ];
    }

    this.prompt(prompts).then(function (props) {
        this.kata = props.kata;
        done();
    }.bind(this));
}
