String mainFolder = 'POC'
String projectFolder = 'microservices'
String basePath = mainFolder + "/" +  projectFolder
String gitRepo = 'nike-service-1'
String gitUrl = 'https://github.com/ElizabethGagne/' + gitRepo


folder("$mainFolder") {
    description 'POC Folder'
}

folder("$basePath") {
    description 'microservices'
}

// If you want, you can define your seed job in the DSL and create it via the REST API.
// See README.md

job("$basePath/0. seed") {
    scm {
        git("$gitUrl")
    }
    triggers {
        scm 'H/5 * * * *'
    }
    steps {
        dsl {
            external 'pipeline/jobs/set-up-jobs.dsl'
            additionalClasspath 'src/main/groovy'
        }
    }
}