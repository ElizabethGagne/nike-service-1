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
            this.copy('gradle/conf/stream.gradle','gradle/conf/stream.gradle');
        },

       testAppendToFile: function() {
           this.addElementToTheGradleFile(`apply from: 'gradle/conf/stream.gradle'`);
           this.appendFileAToFileB(this.templatePath('src/main/resources/_application.yml'), this.destinationPath('src/main/resources/application.yml'));
        },

        writeTheFiles: function() {
            //this.packageFolder = this.packageName.replace(/\./g, '/');

            this.template('src/main/java/package/stream/_MetaData.java',     'src/main/java/'+ this.packageFolder +'/stream/' + this.entityClass + 'Metadata.java', this, {});

            if (this.channelType == 'sink' && this.generateWebSocket == 'no') {
                this.template('src/main/java/package/stream/_Sink.java',     'src/main/java/'+ this.packageFolder +'/stream/' + this.entityClass + 'Sink.java', this, {});
                this.template('src/test/groovy/package/test/stream/_SinkSpec.groovy', 'src/test/groovy/'+ this.packageFolder +'/test/stream/' + this.entityClass + 'SinkSpec.groovy', this, {});
            }

            if (this.channelType == 'source') {
                this.template('src/main/java/package/stream/_Source.java',     'src/main/java/'+ this.packageFolder +'/stream/' + this.entityClass + 'Source.java', this, {});
                this.template('src/test/groovy/package/test/stream/_SourceSpec.groovy', 'src/test/groovy/'+ this.packageFolder +'/test/stream/' + this.entityClass + 'SourceSpec.groovy', this, {});
            }

            if (this.channelType == 'processor') {
                this.template('src/main/java/package/stream/_Processor.java',     'src/main/java/'+ this.packageFolder +'/stream/' + this.entityClass + 'Processor.java', this, {});
                this.template('src/test/groovy/package/test/stream/_ProcessorSpec.groovy', 'src/test/groovy/'+ this.packageFolder +'/test/stream/' + this.entityClass + 'ProcessorSpec.groovy', this, {});
            }

            if (this.generateRest == 'yes') {
                this.template('src/main/java/package/rest/_Rest.java',              'src/main/java/'+ this.packageFolder +'/rest/' + this.entityClass + 'Rest.java', this, {});
                this.template('src/test/groovy/package/test/rest/_RestSpec.groovy', 'src/test/groovy/'+ this.packageFolder +'/test/rest/' + this.entityClass + 'RestSpec.groovy', this, {});
            }
            if (this.generateWebSocket == 'yes') {
                this.template('src/main/java/package/stream/_SinkSocket.java',     'src/main/java/'+ this.packageFolder +'/stream/' + this.entityClass + 'SinkSocket.java', this, {});
                this.template('src/main/java/package/socket/_WebsocketConfiguration.java',              'src/main/java/'+ this.packageFolder +'/socket/WebsocketConfiguration.java', this, {});
            }
        }

    };
}
