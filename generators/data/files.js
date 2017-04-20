'use strict';

const mkdirp 	= require('mkdirp'),
    cleanup 	= require('../cleanup'),
    _           = require('lodash'),
    _s          = require('underscore.string');

/* Constants use throughout */
const constants = require('../generator-constants');

module.exports = {
    writeFiles
};

function writeFiles() {
    return {
	     appendFiles: function () {
       	    this.util = {};
		    this.util.contains = _.contains;

		    //if (this.useConfigurationFile == false) { // store informations in a file for further use.
		    //    this.data = {};
		    //    this.data.fields = this.fields;
		    //    this.write(this.filename, JSON.stringify(this.data, null, 4));
		    //} else  {
		    //    this.fields = this.fileData.fields;
		    //}

		    // Load in-memory data for fields
		    /*
		    for (var idx in this.fields) {
		        var field = this.fields[idx];

		        if (_.isUndefined(field.fieldNameCapitalized)) {
		            field.fieldNameCapitalized = _s.capitalize(field.fieldName);
		        }

		        if (_.isUndefined(field.fieldNameUnderscored)) {
		            field.fieldNameUnderscored = _s.underscored(field.fieldName);
		        }
		    }
		    */

		    this.fieldsContainDateTime = false;
		    for (var idx in this.fields) {
		        var field = this.fields[idx];
		        if (field.fieldType == 'DateTime') {
		            this.fieldsContainDateTime = true;
		        }
		    }
		    this.fieldsContainBigDecimal = false;
		    for (var idx in this.fields) {
		        var field = this.fields[idx];
		        if (field.fieldType == 'BigDecimal') {
		            this.fieldsContainBigDecimal = true;
		        }
		    }
		    this.entityClass = _s.capitalize(this.name);
		    this.entityInstance = _s.decapitalize(this.name);

		    this.differentTypes = [this.entityClass];

		    var insight = this.insight();
		    insight.track('generator', 'entity');
		    insight.track('entity/fields', this.fields.length);

		    this.packageFolder = this.packageName.replace(/\./g, '/');

		    if (this.createentity == 'yes') {

		    	this.template('src/integration/groovy/package/it/resource/_ItSpec.groovy',
			        	'src/integration/groovy/' + this.packageFolder + '/it/resource/' + this.entityClass + 'RepoItSpec.groovy', this, {});

			    if(this.datastore == 'elasticsearch') {
			    	this.template('src/main/java/package/entity/_ElasticEntity.java',
			        	'src/main/java/' + this.packageFolder + '/entity/' + this.entityClass + 'Entity.java', this, {});
			    	this.template('src/main/java/package/resource/_ElasticsearchRepository.java',
			        	'src/main/java/' + this.packageFolder + '/resource/' + this.entityClass + 'Repository.java', this, {});
			    }

			    if(this.datastore == 'jpa') {
			    	this.template('src/main/java/package/entity/_RdbEntity.java',
			        	'src/main/java/' + this.packageFolder + '/entity/' + this.entityClass + 'Entity.java', this, {});
			    	this.template('src/main/java/package/resource/_RdbRepository.java',
			        	'src/main/java/' + this.packageFolder + '/resource/' + this.entityClass + 'Repository.java', this, {});
			    }
			}

    		if(this.createdto == 'yes') {
    			this.template('src/main/java/package/dto/_Dto.java',
		        	'src/main/java/' + this.packageFolder + '/dto/' + this.entityClass + 'Dto.java', this, {});
    		}
        }
    };
}
