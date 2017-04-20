String mainFolder = 'POC'
String projectFolder = 'microservices'
String basePath = mainFolder + "/" +  projectFolder
String gitRepo = 'nike-service-1'
String gitUrl = 'https://github.com/ElizabethGagne/' + gitRepo

pipelineJob("$basePath/1. pre-configure") {
    scm {
        git("$gitUrl")
    }

    parameters {
        stringParam('GIT_URL' , "$gitUrl", 'Git repository url of your application.')
    }

    definition {
        cps {
            script(readFileFromWorkspace('pipeline/jobs/PreConfigure.groovy'))
            sandbox()
        }
    }
}

pipelineJob("$basePath/2. create-deployment") {
    scm {
        git("$gitUrl")
    }

    parameters {
        stringParam('GIT_URL' , "$gitUrl", 'Git repository url of your application.')
        stringParam('HOSTED_ZONE_NAME', 'microsvc.goe3.me', 'Domain Name for your Application.')
    }

    definition {
        cps {
            script(readFileFromWorkspace('pipeline/jobs/CreateDeployment.groovy'))
            sandbox()
        }
    }
}

pipelineJob("$basePath/3. update-service") {
    scm {
        git("$gitUrl")
    }

    triggers {
        bitbucketPush()
    }

    parameters {
        stringParam('GIT_URL' , "$gitUrl", 'Git repository url of your application.')
    }

    definition {
        cps {
            script(readFileFromWorkspace('pipeline/jobs/UpdateService.groovy'))
            sandbox()
        }
    }
}
