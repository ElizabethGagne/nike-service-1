'use strict';

const mkdirp = require('mkdirp'),
    cleanup = require('../cleanup'),
    _s          = require('underscore.string'),
    chalk = require('chalk');

/* Constants use throughout */
const constants = require('../generator-constants');

module.exports = {
    writeFiles
};

function writeDocPage(data) {
    //console.log(chalk.red('HAHAAHAHAAHAAH'));
    this.printLogo(data.title);
    console.log('\n' + chalk.green("Description")); 
    console.log('\t' + data.description);

    console.log('\n' + chalk.green("Pre-Requirments"));
    for (var i in data.prereqs) {
        console.log('\t' + (Number(i) + 1) + ": " + data.prereqs[i]);
    }
    
    console.log('\n' + chalk.green("Command"));
    console.log('\t' + data.command);
    
    if (data.argDesctiption) {
        console.log('\n' + chalk.green("Argument Description"));
        console.log('\t' + data.argDesctiption);
    }
    console.log('\n' + chalk.green("Usage"));
    for (var i in data.usage) {
      console.log('\t' + (Number(i) + 1) + ": " + data.usage[i]);
    }

    console.log('\n' + chalk.green("YouTube"));
    console.log('\t' + chalk.yellow("Mac users... ") + "to open in browser: cmd + (double-click-link-below)");
    console.log('\t' + chalk.red(data.youtube));

    console.log('\n\n');
}

function writeFiles() {
    return { 

        appendFiles: function () {
        	
            if (this.topic == 'start') {
                var data = {
                    title: "Inception Generator",
                    description: "This generator option will initialize a new microservice.",
                    command: "yo kar-boot", 
                    prereqs: [
                        "Must be run with an emptry project folder"
                    ],
                    usage: [
                        "In an empty directory simply run the above command. ",
                        "Answer the questions at the prompt.",
                        "Once the generator runs, the entire project structure has been created for use.",
                        "For the general build run: gradle clean build",
                        "Eclipse: gradle cleaneclipse eclipse",
                        "Intellij: gradle cleanidea idea"
                    ],
                    youtube: "http://youtu.be/IVSqVtNA45U?hd=1"
                };
                writeDocPage.call(this, data);
            } else if (this.topic == 'datastore') {
                var data = {
                    title: "Datastore",
                    description: "This sub-generator option will inject the required scaffolding for various data stores",
                    command: "yo kar-boot:datastore", 
                    prereqs: [
                        "(yo kar-boot) must have already been run."
                    ],
                    usage: [
                        "In a pregenerated project, simply run the above command.",
                        "Answer the questions at the prompt.",
                        "Once the generator runs the required files will be added to the project for your selected datastore.",
                        "You will need to re-create the files for your ide. Run one of the commands below.",
                        "Eclipse: gradle cleaneclipse eclipse",
                        "Intellij: gradle cleanidea idea"
                    ],
                    youtube: "http://youtu.be/Zg1NWnK6c3Y?hd=1"
                };
                writeDocPage.call(this, data);
            } else if (this.topic == 'data') {
                var data = {
                    title: "Data",
                    description: "This generator option create dto, entity, and repository code for the microservice.",
                    command: "yo kar-boot:data <ARG>", 
                    prereqs: [
                        "(yo kar-boot) must have already been run.",
                        "(yo kar-boot:datastore) must have already been run in the project."
                    ],
                    usage: [
                        "In a pregenerated project, simply run the above command.",
                        "Answer the questions at the prompt.",
                        "Once the generator runs, the dto, entity, repository and tests will have been generated",
                        "No need to re-create any project files. They should just show up in the IDE."
                    ],
                    argDesctiption: "Name that will be given to the entity. Must start with an uppercase letter.",
                    youtube: "http://youtu.be/Zg1NWnK6c3Y?hd=1"
                };
                writeDocPage.call(this, data);
            } else if (this.topic == 'stack') {
                var data = {
                    title: "Stack",
                    description: "This generator option will create the objects and tests for the business, facade, and rest tier.",
                    command: "yo kar-boot:stack <ARG>", 
                    prereqs: [
                        "(yo kar-boot) must have already been run.",
                        "(yo kar-boot:datastore) must have already been run in the project.",
                        "(yo kar-boot:data) must have already been run in the project."
                    ],
                    usage: [
                        "In a pregenerated project, simply run the above command.",
                        "Answer the questions at the prompt.",
                        "Once the generator runs, the business, facade, and rest objects, along with their tests will be generated",
                        "No need to re-create any project files. They should just show up in the IDE."
                    ],
                    argDesctiption: "Name that will be given to the objects being created. Must start with an uppercase letter.",
                    youtube: "http://youtu.be/Hkff_qS2B3Y?hd=1"
                };
                writeDocPage.call(this, data);
            } else if (this.topic == 'stream') {
                var data = {
                    title: "Stream",
                    description: "This generator option will integrate Kafka, websockets, and rest endpoints.",
                    command: "yo kar-boot:stream <ARG>", 
                    prereqs: [
                        "(yo kar-boot) must have already been run.",
                        "(yo kar-boot:datastore) must have already been run in the project.",
                        "(yo kar-boot:data) must have already been run in the project."
                    ],
                    usage: [
                        "In a pregenerated project, simply run the above command.",
                        "Answer the questions at the prompt.",
                        "Once the generator runs, all the plumbing for kafka and websockets is injected into the project.",
                        "Also, the runtime objects are configured and created in the project structure. Tests are also created.",
                        "No need to re-create any project files. They should just show up in the IDE."
                    ],
                    argDesctiption: "Name that will be given to the objects being created. Must start with an uppercase letter.",
                    youtube: "NONE"
                };
                writeDocPage.call(this, data);
            } else {
                console.log("Printing for: " + this.topic);
            }

        }
    };
}
