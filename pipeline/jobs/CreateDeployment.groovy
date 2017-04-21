String project = 'microservices'
String repository = 'nike-service-1'

node {
    git url: GIT_URL

    env.TAG_LIST="1.0-${env.GIT_HASH}-${env.EPOCH}"
    env.REPOSITORY="${project}/${repository}"
    env.ACCOUNT_NUMBER=stringFromOutput("aws iam get-user | awk '/arn:aws:/{print \$2}' | cut -d \\: -f 5")
    env.REGION=stringFromOutput("aws configure get default.region")
    env.AWS_TAG="${env.ACCOUNT_NUMBER}.dkr.ecr.${env.REGION}.amazonaws.com/${env.REPOSITORY}:${env.TAG_LIST}"

    sh "sed -i.bak s/image\:.*/${AWS_TAG}/g kubernetes/nike-service-1-app.yml"
    sh "cat kubernetes/nike-service-1-app.yml"

    stage "Deploy to Kubernetes" // --------------------------------------
    //sh 'kubectl apply -f kubernetes'
}