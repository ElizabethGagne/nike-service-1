'use strict';

const mkdirp = require('mkdirp'),
    cleanup = require('../cleanup'),
    _s          = require('underscore.string'),
    snakeCase = require('lodash.snakecase');

/* Constants use throughout */
const constants = require('../generator-constants');

module.exports = {
    writeFiles
};

function writeFiles() {
    return {

        appendFiles: function () {
        this.entityClass = _s.capitalize(this.name);
		    this.entityInstance = _s.decapitalize(this.name);
		    this.entityPath = this.name.toLowerCase();

        	if (this.stackInfo.business.generate == 'yes') {
        		this.template(
                    'src/main/java/package/business/_Business.java',
                    'src/main/java/' + this.packageFolder+ '/business/'+ this.entityClass + 'Business.java',
                    this,
                    {}
                );
                this.template(
                    'src/main/java/package/business/impl/_BusinessImpl.java',
                    'src/main/java/' + this.packageFolder+ '/business/impl/'+ this.entityClass + 'BusinessImpl.java',
                    this,
                    {}
                );

                this.template(
                    'src/test/groovy/package/unit/business/_BusinessUnitSpec.groovy',
                    'src/test/groovy/' + this.packageFolder + '/unit/business/' + this.entityClass + 'BusinessUnitSpec.groovy', this,
                    {}
                );

        	}

            if (this.stackInfo.facade.generate == 'yes') {
                this.template(
                    'src/main/java/package/facade/_Facade.java',
                    'src/main/java/' + this.packageFolder+ '/facade/'+ this.entityClass + 'Facade.java',
                    this,
                    {}
                );
                this.template(
                    'src/main/java/package/facade/impl/_FacadeImpl.java',
                    'src/main/java/' + this.packageFolder+ '/facade/impl/'+ this.entityClass + 'FacadeImpl.java',
                    this,
                    {}
                );

                this.template(
                    'src/test/groovy/package/unit/facade/_FacadeUnitSpec.groovy',
                    'src/test/groovy/' + this.packageFolder + '/unit/facade/' + this.entityClass + 'FacadeUnitSpec.groovy', this,
                    {}
                );

                if(this.readFacadeMethod) {

                    this.template(
                        'src/jbehave/groovy/package/jbehave/facade/entitypath/_FindOneBehaviour.groovy',
                        'src/jbehave/groovy/' + this.packageFolder + '/jbehave/facade/' + this.entityPath +'/'+ this.entityClass + 'FindOneBehaviour.groovy', this,
                        {}
                    );
                    this.template(
                        'src/jbehave/stories/package/jbehave/facade/entitypath/_find_one_behaviour.story',
                        'src/jbehave/stories/' + this.packageFolder + '/jbehave/facade/' + this.entityPath +'/'+ snakeCase(this.entityInstance) + '_find_one_behaviour.story', this,
                        {}
                    );
                }
                if(this.saveFacadeMethod) {
                    this.template(
                        'src/jbehave/groovy/package/jbehave/facade/entitypath/_SaveBehaviour.groovy',
                        'src/jbehave/groovy/' + this.packageFolder + '/jbehave/facade/' + this.entityPath +'/'+ this.entityClass + 'SaveBehaviour.groovy', this,
                        {}
                    );
                    this.template(
                        'src/jbehave/stories/package/jbehave/facade/entitypath/_save_behaviour.story',
                        'src/jbehave/stories/' + this.packageFolder + '/jbehave/facade/' + this.entityPath +'/'+ snakeCase(this.entityInstance) + '_save_behaviour.story', this,
                        {}
                    );
                }

            }

            if (this.stackInfo.rest.generate == 'yes') {
                this.template(
                    'src/main/java/package/web/_RestController.java',
                    'src/main/java/' + this.packageFolder+ '/web/'+ this.entityClass + 'Controller.java',
                    this,
                    {}
                );

                this.template(
                    'src/test/groovy/package/unit/web/_RestControllerUnitSpec.groovy',
                    'src/test/groovy/' + this.packageFolder + '/unit/web/' + this.entityClass + 'ControllerUnitSpec.groovy', this,
                    {}
                );
            }
        }
    };
}
