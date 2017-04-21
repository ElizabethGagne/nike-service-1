String mainFolder = 'microservices'
String projectFolder = 'NikeService1'
String basePath = mainFolder + "/" +  projectFolder
String gitUrl = 'https://github.com/ElizabethGagne/nike-service-1'

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
