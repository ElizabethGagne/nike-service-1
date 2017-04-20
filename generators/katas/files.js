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
var kataMap = {};

kataMap["repoSetUp"] = {
            title: "Kata Repo Setup",
            description: "Quick video on how to set up your environment for the repository dojo.",
            timebox: "1 min",
            video: "http://youtu.be/4UutmiVIx7Y?hd=1",
            steps: [
                "Create an empty directory.",
                "cd into the directory",
                "Run the following command:",
                "\tyo kar-boot",
                "Follow the prompts...\n",
                "Run the following command:",
                "\tgradle clean build\n",
                "Add the datastore by entering the following command:", 
                "\tyo kar-boot:datastore",
                "select JPA\n",
                "If you are using intellij run the following:",
                "\tgradle cleanidea idea",
                "If you are using eclipse run the following:",
                "\tgradle cleaneclipse eclipse",
                "Open up the project in your prefered editor"
            ]
        };

kataMap["entitySetUp"] = {
            title: "Create The Entity",
            description: "A video showing how to create the entity required to continue with the katas.",
            timebox: "1 min",
            video: "http://youtu.be/Ygght8hzHxg?hd=1",
            steps: [
                "Create the entity package",
                "Create a file called Taco",
                "Add the class annotations @Data & @Entity",
                "Add the Id field and annotations",
                "Add the name field"
            ]
        };

kataMap["repositoryKata"] = {
            title: "Repository Creation",
            description: "A video showing how to create a repository and test it.",
            timebox: "3 min",
            video: "http://youtu.be/pbKfj9OX-gY?hd=1",
            steps: [
                "Create the repo package",
                "Create an interface called ITacoRepository",
                "Extend the interface with JpaRepository<Taco, Long>\n",
                "Create the repo package in the integration source tree",
                "Create the groovy file: TacoRepositoryItSpec",
                "Extend the class with AbstractItTest",
                "Inject the ITacoRepository interface",
                "Write the simple test case."
            ]
        };


kataMap["repositoryKataAddNameTest"] = {
            title: "Adding a Method",
            description: "Adding findByName and test to the ITacoRepository",
            timebox: "2 min",
            video: "http://youtu.be/oUOsXfIiupE?hd=1",
            steps: [
                "create the method in the ITacoRepository",
                "Create the test method in the TacoRepositoryItSpec class."
            ]
        };


kataMap["businessKataSetup"] = {
            title: "Business Katas Setup",
            description: "How to set up for the business tier katas.",
            timebox: "2 min",
            video: "http://youtu.be/UP9qrZy8Nyw?hd=1",
            steps: [
                "Nothing if you already have the setup",
                "In an empty folder run yo kar-boot",
                "Set up the repostitory with yo kar-boot:datastore",
                "Create the repository artifacts with yo kar-boot:data Taco",
                "Run gradle clean build idea eclipse",
                "Open it up in your editor of choice"
            ]
        };

kataMap["businessKataCreation"] = {
            title: "Create Business Objects",
            description: "Create the interface, class, and test for integrating a new business object into the system.",
            timebox: "4 min",
            video: "http://youtu.be/LZC1q5NCHCY?hd=1",
            steps: [
                "Create the business folder if it does not exist",
                "Create the ITacoBusiness interface in the folder",
                "Add the findOne method to the interface",
                "Create the impl package",
                "Create the TacoBusiness object in the impl package",
                "Add implements ITacoBusiness to the TacoBusiness object",
                "Add the findOne method to the class",
                "In the test package, create the test.business folder",
                "Create the TacoBusinessUnitSpec",
                "Extend the class with Specification",
                "write the test"

            ]
        };

kataMap["facadeSetupContinued"] = {
            title: "Create Dto",
            description: "Note that this kata is in the event that you are following the tutorial. If you need to create a project from scratch please see the next kata. This kata shows you how to add the TacoDto to the project.",
            timebox: "45 secs",
            video: "http://youtu.be/ZBdrqjyarkk?hd=1",
            steps: [
                "Create the dto package",
                "Add the @Data annotation",
                "Add the id field."
            ]
        };

kataMap["facadeSetupFromScratch"] = {
            title: "Setup Facade From Scratch",
            description: "Sets up the Kata from scratch using the generator.",
            timebox: "1 min",
            video: "http://youtu.be/x6F7hFOgMfE?hd=1",
            steps: [
                "In an empty Directo run the following:",
                "yo kat-boot",
                "yo kat-boot:datastore",
                "yo kat-boot:data Taco",
                "yo kat-boot:stack Taco",
                "gradle cleam build idea"
            ]
        };

kataMap["facadeInterfaceAndTestSetup"] = {
            title: "Facade Inteface and Test",
            description: "Sets up the interface and test harness in preparion for writting the application code. Note that the test will fail during this kata.",
            timebox: "2 min",
            video: "http://youtu.be/N-ajwNuLfAg?hd=1",
            steps: [
                "Create the facade folder and add the interface ITacoFacade",
                "Add a method: TacoDto findOne(Long id)",
                "Create a package (test.facade) in the test source tree",
                "Create the class TacoFacadeUnitSpec",
                "Create the I*Facade as a private variable",
                "create the simple test method",
                "Run the tests and fail"
            ]
        };

kataMap["facadeImplAndTestsPass"] = {
            title: "Facade Implementation",
            description: "Grrrrr",
            timebox: "4 min",
            video: "http://youtu.be/ef8OG6VyTMg?hd=1",
            steps: [
                "Create impl folder and Java class TacoFacade which extends ITacoFacade",
                "Add the findOne method",
                "Add the @Service annotation",
                "Add Dozer and ITacoBusiness with @Autowired annotation.",
                "Wire in the new dependancies in the setup method",
                "Add the verify method",
                "Run the test and pass"
            ]
        };


kataMap["facadeJBehave"] = {
            title: "JBehave Integation",
            description: "Not Complete",
            timebox: "0 min",
            video: "NO VIDEO YET",
            steps: [
                "No Steps defined yet"
            ]
        };

kataMap["restSetup"] = {
            title: "Rest Tier Setup",
            description: "How to set up the rest tier from scratch.",
            timebox: "2 min",
            video: "http://youtu.be/LTZSvbYtoZo?hd=1",
            steps: [
                "Run the seed commands listed below and follow the prompts",
                "yo kar-boot",
                "yo kar-boot:datastore",
                "yo kar-boot:data Taco",
                "yo kar-boot:stack Taco"
            ]
        };

kataMap["restTestAndFail"] = {
            title: "Rest And Test And Fail",
            description: "Setting up the rest class and test class. Note that the build will fail at this point.",
            timebox: "2 min",
            video: "http://youtu.be/typrxSxMtgA?hd=1",
            steps: [
                "Create the TacoController extends AbstractController",
                "Add the @RestController annotation",
                "Create the unit test class",
                "Add the TacoController as a class var",
                "create the method",
                "Fail the test"
            ]
        };

kataMap["restFinalImplementation"] = {
            title: "Rest Final Code",
            description: "Writting the implementation code in order to pass the unit tests.",
            timebox: "4 min",
            video: "http://youtu.be/9L-Xx-DEDpY?hd=1",
            steps: [
                "Add the ITacoFacade interface",
                "Add the get() method",
                "Add the method annotations",
                "Write the implementation for the get() method",
                "Run the unit test. Fails",
                "Add the setup() method and bind the TacoController and Mock the ITacoFacade",
                "Run the unit test. Fails",
                "Fix the unit test"
            ]
        };

function showKata(data) {
    
    this.printKata(data.title);
    console.log('\n' + chalk.green("Description"));
    console.log('\t' + data.description);

    console.log('\n' + chalk.green("Timebox"));
    console.log('\t' + data.timebox);

    console.log('\n' + chalk.green("Video"));
    console.log('\t' + data.video);

    console.log('\n' + chalk.green("Steps"));
    for (var i in data.steps) {
      console.log('\t' + (Number(i) + 1) + ": " + data.steps[i]);
    }
    console.log('\n\n');
}

function writeFiles() {
    return { 

        appendFiles: function () {
        	showKata.call(this, kataMap[this.kata]);
        }
    };
}
