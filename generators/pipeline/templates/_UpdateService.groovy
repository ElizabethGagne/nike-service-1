String project = 'microservices'
String repository = '<%= dockerRepositoryName %>'


node {

    stage "Build Service" // --------------------------------------

    git url: GIT_URL
    env.EPOCH="latest"
    env.GIT_HASH=stringFromOutput('git rev-parse HEAD | cut -c-8')
    env.TAG_LIST="1.0-${env.GIT_HASH}-${env.EPOCH}"
    env.REPOSITORY="${project}/${repository}"
    env.ACCOUNT_NUMBER=stringFromOutput("aws iam get-user | awk '/arn:aws:/{print \$2}' | cut -d \\: -f 5")
    env.REGION=stringFromOutput("aws configure get default.region")
    env.AWS_TAG="${env.ACCOUNT_NUMBER}.dkr.ecr.${env.REGION}.amazonaws.com/${env.REPOSITORY}:${env.TAG_LIST}"

    sh 'echo ${AWS_TAG}'

    // Build the java code with gradle
    docker.image('gradle:3.5-jre8').inside {
      buildService()
    }

    step([$class: "JUnitResultArchiver", testResults: "build/**/TEST-*.xml"])

    stage "Bake Service's Docker image" // ------------------------

    // Bake the Docker Image
    def localImage = docker.build("${env.AWS_TAG}", ".")
    sh 'docker images'

    // Login into Amazon ECR
    sh '$(aws ecr get-login)'

    // Push Docker Image to Amazon ECR Repository
    localImage.push()

    stage "Update Service to Kubernetes" // ------------------------------

    updateService(repository, image)
}

def buildService() {
    def command = 'cd ../../\n' + './gradlew build integration jbehave sonarqube -PbuildProfile=openshift -Dspring.profiles.active=openshift'
    sh command
}

def updateService(repository, image) {
    def command = 'kubectl rolling-update ' + repository + ' --image=' + image
    sh command
}

def stringFromOutput(String command) {
    sh command + ' > .variable'
    String content = readFile '.variable'
    return content.trim()
}
