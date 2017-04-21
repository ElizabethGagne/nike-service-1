String project = 'microservices'
String repository = '<%= dockerRepositoryName %>'

node {
    git url: GIT_URL

    env.TAG_LIST="latest"
    env.REPOSITORY="${project}/${repository}"
    env.ACCOUNT_NUMBER=stringFromOutput("aws iam get-user | awk '/arn:aws:/{print \$2}' | cut -d \\: -f 5")
    env.REGION=stringFromOutput("aws configure get default.region")
    env.AWS_TAG="${env.ACCOUNT_NUMBER}.dkr.ecr.${env.REGION}.amazonaws.com/${env.REPOSITORY}:${env.TAG_LIST}"

    sh 'echo ${AWS_TAG}'

    sh 'sed -i.bak s,image:.*,image:${AWS_TAG},g kubernetes/<%= dasherizedBaseName.toLowerCase() %>-app.yml'

    stage "Deploy to Kubernetes" // --------------------------------------
    sh 'kubectl apply -f kubernetes'
}

def stringFromOutput(String command) {
    sh command + ' > .variable'
    String content = readFile '.variable'
    return content.trim()
}
