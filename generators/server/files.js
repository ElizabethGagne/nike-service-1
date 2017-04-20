'use strict';

const mkdirp = require('mkdirp'),
    cleanup = require('../cleanup');

/* Constants use throughout */
const constants = require('../generator-constants'),
    INTERPOLATE_REGEX = constants.INTERPOLATE_REGEX,
    UNIT_TEST_DIR = constants.UNIT_TEST_DIR,
    SERVER_MAIN_SRC_JAVA_DIR = constants.SERVER_MAIN_SRC_JAVA_DIR;

module.exports = {
    writeFiles
};

var javaDir;

function writeFiles() {
    return {

        setUpJavaDir() {
            javaDir = this.javaDir = constants.SERVER_MAIN_SRC_JAVA_DIR + this.packageFolder + '/';
        },

        writeGlobalFiles: function () {
            this.copy('microservice-architecture.md',   'microservice-architecture.md');
            this.copy('gitignore',                      '.gitignore');
            this.copy('editorconfig',                   '.editorconfig');
            this.copy('dockerignore',                   '.dockerignore');

            this.template('_README.md',                 'README.md', this, {});
            this.template('_Jenkinsfile',               'Jenkinsfile', this, {});
            this.template('_Dockerfile',                'Dockerfile', this, {});
            this.template('_docker-compose.yml',        'docker-compose.yml', this, {});
        },

        writeGradleFiles: function() {
            this.copy('build.gradle',                               'build.gradle');
            this.copy('gradle/conf/boot.gradle',                    'gradle/conf/boot.gradle');
            this.copy('gradle/conf/misc.gradle',                    'gradle/conf/misc.gradle');
            this.copy('gradle/conf/metrics.gradle',                 'gradle/conf/metrics.gradle');
            this.copy('gradle/conf/swagger.gradle',                 'gradle/conf/swagger.gradle');
            this.copy('gradle/conf/jackson.gradle',                 'gradle/conf/jackson.gradle');
            this.copy('gradle/conf/ide.gradle',                     'gradle/conf/ide.gradle');
            //this.copy('gradle/conf/security.gradle',                'gradle/conf/security.gradle');
            this.copy('gradle/conf/admin-client.gradle',            'gradle/conf/admin-client.gradle');

            this.copy('gradlew',                                    'gradlew');
            this.copy('gradlew.bat',                                'gradlew.bat');
            this.copy('gradle/wrapper/gradle-wrapper.jar.bx',       'gradle/wrapper/gradle-wrapper.jar');
            this.copy('gradle/wrapper/gradle-wrapper.properties',   'gradle/wrapper/gradle-wrapper.properties');
            this.copy('gradle/conf/openshift-repositories.gradle',  'gradle/conf/openshift-repositories.gradle');

            this.template('_settings.gradle',                       'settings.gradle');
            this.template('_gradle.properties',                     'gradle.properties', this, {});


            var gradleTestFolder = 'gradle/conf/test/';
            this.template(
                gradleTestFolder + '_sonar.gradle',
                gradleTestFolder + 'sonar.gradle',
                this, {}
            );
            this.copy(gradleTestFolder + 'integration.gradle',      gradleTestFolder + 'integration.gradle');
            this.copy(gradleTestFolder + 'jbehave.gradle',          gradleTestFolder + 'jbehave.gradle');
            this.copy(gradleTestFolder + 'unit.gradle',             gradleTestFolder + 'unit.gradle');
            this.copy(gradleTestFolder + 'gatling.gradle',          gradleTestFolder + 'gatling.gradle');
        },

        writeGatling: function() {
            var gatlingConf = 'src/gatling/conf/';
            var gatlingHelpers = 'src/gatling/simulations/helpers/';
            var simulationsPath = 'src/gatling/simulations/';

            this.copy(gatlingConf + 'gatling.conf',                 gatlingConf + 'gatling.conf');
            this.copy(gatlingHelpers + 'TestHelper.scala',          gatlingHelpers + 'TestHelper.scala');
            this.copy('src/gatling/data/gitkeep',                   'src/gatling/data/.gitkeep');
            this.copy('src/gatling/bodies/gitkeep',                 'src/gatling/bodies/.gitkeep');
            this.template(gatlingHelpers + '_HttpHelper.scala',     gatlingHelpers + 'HttpHelper.scala', this, {});

            this.template(simulationsPath + 'sim0000/HealthSimulation.scala', simulationsPath + 'sim0000/HealthSimulation.scala', this, {});

        },

        writeMainResources: function() {
            var resourceFolder = 'src/main/resources/'
            this.copy(resourceFolder + 'logback.xml',               resourceFolder + 'logback.xml');
            this.copy(resourceFolder + 'dozer-mappings.xml',        resourceFolder + 'dozer-mappings.xml');
            this.template(resourceFolder + '_application-openshift.yml', resourceFolder + 'application-openshift.yml', this, {});
            this.template(resourceFolder + '_bootstrap.yml',        resourceFolder + 'bootstrap.yml', this, {});
            this.template(resourceFolder + '_application.yml',      resourceFolder + 'application.yml', this, {});
        },

        writeMainJava: function() {
            var srcTemplates = 'src/main/java/package/';
            var destination = 'src/main/java/' + this.packageFolder + '/';

            this.template(srcTemplates + '_Application.java',    destination + 'Application.java', this, {});

            var srcGenerated    = 'src/main/java/package/generated/';
            var destGenerated   = 'src/main/java/' + this.packageFolder + '/generated/';
            this.template(srcGenerated + '_AbstractMappingAware.java',      destGenerated + 'AbstractMappingAware.java', this, {});
            this.template(srcGenerated + '_GlobalExceptionHandler.java',    destGenerated + 'GlobalExceptionHandler.java', this, {});
            this.template(srcGenerated + '_HttpErrorDto.java',              destGenerated + 'HttpErrorDto.java', this, {});
            this.template(srcGenerated + '_JacksonConfiguration.java',      destGenerated + 'JacksonConfiguration.java', this, {});
            this.template(srcGenerated + '_MappingConfig.java',             destGenerated + 'MappingConfig.java', this, {});
            this.template(srcGenerated + '_MetricsConfig.java',             destGenerated + 'MetricsConfig.java', this, {});
            this.template(srcGenerated + '_SwaggerConfig.java',             destGenerated + 'SwaggerConfig.java', this, {});
            this.template(srcGenerated + '_WebConfig.java',                 destGenerated + 'WebConfig.java', this, {});
            //this.template(srcGenerated + '_WebSecurityConfig.java',         destGenerated + 'WebSecurityConfig.java', this, {});

            this.template(srcGenerated + 'util/_CustomDateTimeDeserializer.java',   destGenerated + 'util/CustomDateTimeDeserializer.java', this, {});
            this.template(srcGenerated + 'util/_CustomDateTimeSerializer.java',     destGenerated + 'util/CustomDateTimeSerializer.java', this, {});
            this.template(srcGenerated + 'util/_CustomLocalDateSerializer.java',    destGenerated + 'util/CustomLocalDateSerializer.java', this, {});
            this.template(srcGenerated + 'util/_ISO8601LocalDateDeserializer.java', destGenerated + 'util/ISO8601LocalDateDeserializer.java', this, {});
            this.template(srcGenerated + 'util/_DozerHelper.java',                  destGenerated + 'util/DozerHelper.java', this, {});

            var srcWeb    = 'src/main/java/package/web/';
            var destWeb   = 'src/main/java/' + this.packageFolder + '/web/';
            this.template(srcWeb + '_AbstractController.java',    destWeb + 'AbstractController.java', this, {});
        },

        writeTestFolder: function() {
            var srcTemplates = 'src/test/groovy/package/';
            var destination = 'src/test/groovy/' + this.packageFolder + '/';

            this.copy(srcTemplates + 'gitkeep',    destination + '.gitkeep');
            this.template(
                "src/test/java/package/unit/_ApplicationTests.java",
                "src/test/java/" + this.packageFolder + "/unit/ApplicationTests.java",
                this, {}
            );

        },

        writeJbehave: function() {

            var srcJavaDir = 'src/jbehave/java/package/jbehave/';
            var targetJavaDir = 'src/jbehave/java/' + this.packageFolder + '/jbehave/';

            this.template(srcJavaDir + '_AbstractSpringJBehaveStory.java',       targetJavaDir + 'AbstractSpringJBehaveStory.java', this, {});
            this.template(srcJavaDir + '_AcceptanceTest.java',                   targetJavaDir + 'AcceptanceTest.java', this, {});
            this.template(srcJavaDir + '_AcceptanceTestsConfiguration.java',     targetJavaDir + 'AcceptanceTestsConfiguration.java', this, {});
            this.template(srcJavaDir + '_Steps.java',                            targetJavaDir + 'Steps.java', this, {});

            var srcGroovyPackage = 'src/jbehave/groovy/package/jbehave/facade/';
            var targetGroovyPackage = 'src/jbehave/groovy/' + this.packageFolder + '/jbehave/facade/';

            this.copy(srcGroovyPackage + 'gitkeep', targetGroovyPackage + '.gitkeep');

            var srcStoryPackage = 'src/jbehave/stories/package/jbehave/facade/';
            var targetStoryPackage = 'src/jbehave/stories/' + this.packageFolder + '/jbehave/facade/';
            this.copy(srcStoryPackage + 'gitkeep', targetStoryPackage + '.gitkeep');
        },

        writeIntegrationTest: function() {
            var groovyItTest = 'src/integration/groovy/' + this.packageFolder + '/it/';
            this.template('src/integration/groovy/package/it/_AbstractItTest.groovy', groovyItTest + 'AbstractItTest.groovy', this, {});
        }
    };
}
