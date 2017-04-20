def commitId = env.GIT_COMMIT
print "Checking commit:$commitId"

node {
  commitId = sh(returnStdout: true, script: 'cd ../workspace@script && git rev-parse HEAD').trim()
}

node('nw-jenkins-agent-java') {
    def DEVELOPMENT_PROJECT = 'tesla-dev'
    def QA_PROJECT = 'nw-qa'
    def UAT_PROJECT = 'nw-uat'

    print "applying commit:$commitId"

    stage 'build'

    checkout scm
    sh "./gradlew build integration jbehave sonarqube -PbuildProfile=openshift -Dspring.profiles.active=openshift"
    step([$class: "JUnitResultArchiver", testResults: "build/**/TEST-*.xml"])

    openshiftBuild(namespace: DEVELOPMENT_PROJECT ,buildConfig: 'nike-service-1', showBuildLogs: 'true',commitID: commitId)

    stage 'performance test'

    openshiftDeploy(namespace: QA_PROJECT, deploymentConfig: 'nike-service-1')
    openshiftScale(namespace: QA_PROJECT, deploymentConfig: 'nike-service-1',replicaCount: '1')

    sh "gradle gatlingRun -Dgatling.server.url=http://nike-service-1.${QA_PROJECT}.svc:8080"
    gatlingArchive()

    stage 'uat'
    openshiftDeploy(namespace: UAT_PROJECT, deploymentConfig: 'nike-service-1')
    openshiftScale(namespace: UAT_PROJECT, deploymentConfig: 'nike-service-1',replicaCount: '2')
}
