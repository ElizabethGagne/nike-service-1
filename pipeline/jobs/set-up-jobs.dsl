String mainFolder = 'POC'
String projectFolder = 'microservices'
String basePath = mainFolder + "/" +  projectFolder
String gitRepo = 'nike-service-1'
String gitUrl = 'https://github.com/ElizabethGagne/' + gitRepo

workflowJob("$basePath/1. pre-configure") {
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

workflowJob("$basePath/2. create-deployment") {
  	scm {
        git("$gitUrl")
    }

    parameters {
        stringParam('GIT_URL' , "$gitUrl", 'Git repository url of your application.')
        stringParam('HOSTED_ZONE_NAME', 'microsvc.goe3.me', 'Domain Name for your Application.')
    }

    definition {
        cps {
            script(readFileFromWorkspace('pipeline/jobs/Infrastructure.groovy'))
            sandbox()
        }
    }
}

workflowJob("$basePath/3. update-service") {
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
