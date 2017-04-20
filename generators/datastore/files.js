'use strict';

const mkdirp = require('mkdirp'),
    cleanup = require('../cleanup');

/* Constants use throughout */
const constants = require('../generator-constants');

module.exports = {
    writeFiles
};

function writeFiles() {
    return {

        appendFiles: function () {
        	if (this.datastore == 'elasticsearch') {
        		this.copy('gradle/conf/elastic.gradle','gradle/conf/elastic.gradle');
        		this.addElementToTheGradleFile(`apply from: 'gradle/conf/elastic.gradle'`);
        	} else if (this.datastore == 'jpa') {
        		this.copy('gradle/conf/jpa.gradle','gradle/conf/jpa.gradle');
        		this.addElementToTheGradleFile(`apply from: 'gradle/conf/jpa.gradle'`);
        		this.addElementToTheGradlePropertiesFile('h2_version=1.4.193');
        		this.addElementToTheGradlePropertiesFile('postgresVersion=9.4.1212')
                this.template('src/main/java/package/generated/jpa/_KarEnableTransactionManagement.java','src/main/java/'+ this.packageFolder+ '/generated/jpa/KarEnableTransactionManagement.java', this, {});
        	} else if(this.datastore == 'redis') {
        		this.copy('gradle/conf/redis.gradle','gradle/conf/redis.gradle');
                this.template('src/main/java/package/generated/redis/EmbededRedis.java','src/main/java/'+ this.packageFolder+ '/generated/redis/EmbededRedis.java', this, {});
                this.template('src/main/java/package/generated/redis/RedisConnectionBean.java','src/main/java/'+ this.packageFolder+ '/generated/redis/RedisConnectionBean.java', this, {});
                this.template('src/main/java/package/generated/redis/RedisTemplateConfig.java','src/main/java/'+ this.packageFolder+ '/generated/redis/RedisTemplateConfig.java', this, {});
        		this.addElementToTheGradleFile(`apply from: 'gradle/conf/redis.gradle'`);
        		this.addElementToTheGradlePropertiesFile('embedded_redis_version=0.6');
        		this.addElementToTheGradlePropertiesFile('redis_lettuce_version=4.3.0.Final');
        		this.addElementToTheGradlePropertiesFile('spring_data_kv_version=1.1.6.RELEASE');
        		this.addElementToTheGradlePropertiesFile('spring_data_redis_version=1.8.0.RELEASE');
        	} else if (this.datastore == 'restTemplate') {
                this.template(
                    'src/main/java/package/generated/_RestTemplateConfig.java',
                    'src/main/java/'+ this.packageFolder+ '/generated/RestTemplateConfig.java',
                    this, {}
                );
            }
        }
    };
}
