'use strict';

const _ 			= require('lodash'),
	path 			= require('path'),
	fs 				= require('fs'),
    _s          	= require('underscore.string'),
    karbootutils 	= require('../util');

module.exports = {
    writeFiles
};

function getEntityMethodSignature(that) {
	var methodSignature;
	if (that.isPageable == 'yes') {
		methodSignature =
			'Page<' + that.name + 'Entity> findAllBy' +
			_s.capitalize(that.fieldName) +
			'(' + that.fieldType + ' ' + that.fieldName+ ', Pageable pageable)'
	} else {
		methodSignature =
			that.name +
			'Entity findBy' +
			_s.capitalize( that.fieldName ) +
			'(' + that.fieldType + ' ' + that.fieldName+ ')'
	}
	return methodSignature;
}

function getEntityMethodCallToRepo(that) {
	var methodSignature;
	if (that.isPageable == 'yes') {
		methodSignature =
			'findAllBy' +
			_s.capitalize(that.fieldName) +
			'(' + that.fieldName + ', \pageable)'
	} else {
		methodSignature =
			'findBy' +
			_s.capitalize( that.fieldName ) +
			'(' + that.fieldName+ ')'
	}
	return methodSignature;
}

function getControllerSignature(that) {
  var methodSignature;
  if (that.isPageable == 'yes') {
    methodSignature =
      'ResponseEntity<Page<' + that.name + 'Dto>> findAllBy' + _s.capitalize(that.fieldName)
      + '(@Valid @NotBlank @PathVariable final ' + that.fieldType +' ' + that.fieldName + ', @PageableDefault Pageable pageable)';
  } else {
    methodSignature =
      'ResponseEntity<' + that.name + 'Dto> findBy' + _s.capitalize(that.fieldName)
      + '(@Valid @NotBlank @PathVariable final ' + that.fieldType +' ' + that.fieldName + ')';

  }
  return methodSignature;
}

function getControllerBody(that) {
  var methodBody;
  if (that.isPageable == 'yes') {
    methodBody =
      '\t\tPage<' + that.name + 'Dto> ' + _s.decapitalize(that.name) +'s = ' + _s.decapitalize(that.name) +'Facade.findAllBy' +  _s.capitalize(that.fieldName) + '(' + that.fieldName +', pageable);\n'+
      '\t\treturn ResponseEntity.ok(' + _s.decapitalize(that.name) +'s);\n';
  } else {
    methodBody =
      '\t\t' + that.name + 'Dto ' + _s.decapitalize(that.name) +' = ' + _s.decapitalize(that.name) +'Facade.findBy' +  _s.capitalize(that.fieldName) + '(' + that.fieldName +');\n'+
      '\t\treturn ResponseEntity.ok(' + _s.decapitalize(that.name) +');\n';

  }
  return methodBody;
}

function writeControllerImplementation(srcPath) {

  this.log(srcPath);
  var method =
    '\n\t@GetMapping("/api/' + this.name.toLowerCase() + '/by' + _s.capitalize(this.fieldName) + '/{' + this.fieldName +'}")\n' +
    '\t@Timed\n'+
    '\t' + getControllerSignature(this) +'{\n' + getControllerBody(this) +
    '\t}\n';

  karbootutils.rewriteFile({
    file: srcPath,
    needle: 'kar-boot-find-by-needle',
    splicable: [ method ]
  }, this);
}

function getFacadeSignature(that) {
	var methodSignature;
	if (that.isPageable == 'yes') {
		methodSignature =
			'Page<' + that.name + 'Dto> findAllBy' +
			_s.capitalize(that.fieldName) +
			'(' + that.fieldType + ' ' + that.fieldName+ ', Pageable pageable)'
	} else {
		methodSignature =
			that.name +
			'Dto findBy' +
			_s.capitalize( that.fieldName ) +
			'(' + that.fieldType + ' ' + that.fieldName+ ')'
	}
	return methodSignature;
}

function getFacadeBody(that) {
  var methodBody;
  if (that.isPageable == 'yes') {
    methodBody =
    '\t\tPage<' +  that.name + 'Entity> ' + _s.decapitalize(that.name) + 's = this.' +  _s.decapitalize(that.name) +'Business.' +  getEntityMethodCallToRepo(that) + ';\n' +
    '\t\treturn ' + _s.decapitalize(that.name) + 's.map('+ _s.decapitalize(that.name) + ' -> this.mapper.map(' + _s.decapitalize(that.name) + ', ' + that.name + 'Dto.class));\n';

  } else {
    methodBody =
    '\t\t' +  that.name + 'Entity ' + _s.decapitalize(that.name) + ' = this.' +  _s.decapitalize(that.name) +'Business.' +  getEntityMethodCallToRepo(that) + ';\n' +
    '\t\treturn this.mapper.map(' + _s.decapitalize(that.name) + ', ' + that.name + 'Dto.class);\n';

  }
  return methodBody;
}

function writeFacadeInterface(srcPath) {
	var methodSignature = getFacadeSignature(this);

	karbootutils.rewriteFile({
            file: srcPath,
            needle: 'kar-boot-find-by-needle',
            splicable: ['\n\t' + methodSignature + ';'
            ]
        }, this);
}

function writeFacadeImplementation(srcPath) {
	var method =
	'\n\t@Override\n' +
	'\tpublic ' + getFacadeSignature(this) + " {\n" +
   getFacadeBody(this)+
	'\t}\n';

	karbootutils.rewriteFile({
            file: srcPath,
            needle: 'kar-boot-find-by-needle',
            splicable: [ method ]
        }, this);
}

function writeFacadeSpecForPageable(srcPath) {

  var method =
    '\n\tdef "simple test for the find all by ' +  this.fieldName + '" () {\n\n' +
    '\t\twhen:\n' +
    '\t\tPage rpage = this.' + _s.decapitalize(this.name) + 'Facade.findAllBy' + _s.capitalize(this.fieldName) + '(';

  switch(this.fieldType){
    case 'String': method += '"A String"'; break;
    case 'BigDecimal': method += 'new BigDecimal(1.0)'; break;
    case 'Integer': method += '1';break;
    case 'Long': method += '1L';break;
  }

  method +=
    ', new PageRequest(0, 20));\n\n' +
    '\t\tthen:\n' +
    '\t\t1 * this.' + _s.decapitalize(this.name) + 'Facade.' + _s.decapitalize(this.name) + 'Business.findAllBy' + _s.capitalize(this.fieldName) + '(_, _) >> new PageImpl([new ' + this.name + 'Entity(id: 1L)]);\n' +
    '\t\trpage.getContent().get(0).class == ' + this.name + 'Dto;\n' +
    '\t}'

  karbootutils.rewriteFile({
    file: srcPath,
    needle: 'kar-boot-find-by-needle',
    splicable: [ method ]
  }, this);
}

function writeFacadeSpec(srcPath) {

	var method =
	'\n\tdef "simple test for the find by ' +  this.fieldName + '" () {\n\n' +
	'\t\twhen:\n' +
	'\t\tdef rdto = this.' + _s.decapitalize(this.name) + 'Facade.findBy' + _s.capitalize(this.fieldName) + '(';

	switch(this.fieldType){
    case 'String': method += '"A String");'; break;
    case 'BigDecimal': method += 'new BigDecimal(1.0));'; break;
    case 'Integer': method += '1);';break;
    case 'Long': method += '1L);';break;
  }

	method +=
	'\n\n\t\tthen:\n' +
	'\t\t1 * this.' + _s.decapitalize(this.name) + 'Facade.' + _s.decapitalize(this.name) + 'Business.findBy' + _s.capitalize(this.fieldName) + '(_) >> new ' + this.name + 'Entity(id: 1L);\n' +
	'\t\trdto instanceof ' + this.name + 'Dto;\n' +
	'\t}'

	karbootutils.rewriteFile({
            file: srcPath,
            needle: 'kar-boot-find-by-needle',
            splicable: [ method ]
        }, this);
}

function writeBusinessImplementation(srcPath) {

	var methodSignature =
	'\n\t@Override\n'+
	'\tpublic ' + getEntityMethodSignature(this) + ' {\n' +
	'\t\treturn this.' + _s.decapitalize(this.name) + 'Repo.' + getEntityMethodCallToRepo(this) +';\n' +
	'\t}';

	karbootutils.rewriteFile({
            file: srcPath,
            needle: 'kar-boot-find-by-needle',
            splicable: ['\n' + methodSignature
            ]
        }, this);
}

function writeEntityInterface(srcPath) {

	var methodSignature = getEntityMethodSignature(this) + ';';

    karbootutils.rewriteFile({
            file: srcPath,
            needle: 'kar-boot-find-by-needle',
            splicable: ['\t' + methodSignature
            ]
        }, this);
}

function addImportIfDoesNotExist(srcPath, importFile) {
	var args = {
        file: srcPath,
        searchFor: importFile
    };

	args.path = args.path || process.cwd();
    var fullPath = path.join(args.path, args.file);
    var body = this.fs.read(fullPath);

	if (!body.includes(args.searchFor)) {

		karbootutils.rewriteFile({
            file: srcPath,
            needle: 'kar-boot-add-page-packages',
            splicable: [
            	'import ' + importFile + ';'
            ]
        }, this);
	}
}

function importPageAndPageableIfNotExists(srcPath) {
	//note that order is important here.
	addImportIfDoesNotExist.call(this, srcPath, 'org.springframework.data.domain.Page');
	addImportIfDoesNotExist.call(this, srcPath, 'org.springframework.data.domain.Pageable');
	if (this.fieldType == 'BigDecimal') {
    	addImportIfDoesNotExist.call(this, srcPath, 'java.math.BigDecimal');
    }
}

function writeEntityAndDto(srcPath) {
	if (this.fieldType == 'BigDecimal') {
    	addImportIfDoesNotExist.call(this, srcPath, 'java.math.BigDecimal');
    }
	karbootutils.rewriteFile({
        file: srcPath,
        needle: 'kar-boot-find-by-needle',
        splicable: ['\tprivate ' + this.fieldType + ' ' + this.fieldName + ';'
        ]
    }, this);
}


function writeBusinessSpecForPageable(srcPath) {

	var methodSig =
	'\n\tdef "simple test for the find all by ' +  this.fieldName + ' method" () {\n\n' +
	'\t\twhen:\n' +
	'\t\tthis.' + _s.decapitalize(this.name) + 'Business.findAllBy' + _s.capitalize(this.fieldName) + '( ';

  switch(this.fieldType){
    case 'String': methodSig += '"A String"'; break;
    case 'BigDecimal': methodSig += 'new BigDecimal(1.0)'; break;
    case 'Integer': methodSig += '1';break;
    case 'Long': methodSig += '1L';break;
  }

	methodSig +=
	', new PageRequest(0, 20));\n\n' +
	'\t\tthen:\n' +
	'\t\t1 * this.' + _s.decapitalize(this.name) + 'Repository.findAllBy' + _s.capitalize(this.fieldName) + '(_, _);' +
	'\n\t}\n';

	karbootutils.rewriteFile({
        file: srcPath,
        needle: 'kar-boot-find-by-needle',
        splicable: [ methodSig ]
    }, this);
}

function writeBusinessSpec(srcPath) {

  var methodSig =
    '\n\tdef "simple test for the find by ' +  this.fieldName + ' method" () {\n\n' +
    '\t\twhen:\n' +
    '\t\tthis.' + _s.decapitalize(this.name) + 'Business.findBy' + _s.capitalize(this.fieldName) + '( ';

  switch(this.fieldType){
    case 'String': methodSig += '"A String");'; break;
    case 'BigDecimal': methodSig += 'new BigDecimal(1.0));'; break;
    case 'Integer': methodSig += '1);';break;
    case 'Long': methodSig += '1L);';break;
  }

  methodSig +=
    '\n\n\t\tthen:\n' +
    '\t\t1 * this.' + _s.decapitalize(this.name) + 'Repository.findBy' + _s.capitalize(this.fieldName) + '(_);' +
    '\n\t}\n';

  karbootutils.rewriteFile({
    file: srcPath,
    needle: 'kar-boot-find-by-needle',
    splicable: [ methodSig ]
  }, this);
}

function writeSaveRowToIntegration(that){
  return 'this.' + _s.decapitalize(that.name) + 'Repository.save(new ' + that.name + 'Entity(' + that.fieldName + ':'

}

function writeFindRowToIntegration(that, value){
  var findRow;
  if(that.isPageable == 'yes') {
    findRow = 'def rpage = this.' + _s.decapitalize(that.name) + 'Repository.findAllBy' + _s.capitalize(that.fieldName) + '(' + value+ ', new PageRequest(0, 20));';
  } else {
    findRow = 'def rent = this.' + _s.decapitalize(that.name) + 'Repository.findBy' + _s.capitalize(that.fieldName) + '(' + value + ');';
  }
  return findRow;
}

function writeIntegrationFindAllTest(srcPath) {

  addImportIfDoesNotExist.call(this, srcPath, 'org.springframework.data.domain.PageRequest');

  var splicableText =
    '\n\tdef "simple test case for the find all by ' + this.fieldName + ' method"() {\n';

  switch (this.fieldType) {
    case 'String': {
      splicableText +=
        '\n\t\tsetup:\n' +
        '\t\t' + writeSaveRowToIntegration(this) + ' "String1"));\n' +
        '\t\t' + writeSaveRowToIntegration(this) + ' "String2"));\n';
      if(this.isPageable == 'yes') {
        splicableText +='\t\t' + writeSaveRowToIntegration(this) + ' "String1"));\n';
      }

      splicableText +=
        '\n\t\twhen:\n' +
        '\t\t' + writeFindRowToIntegration(this, '\"String1\"') + '\n';

    }
      ;
      break;
    case 'BigDecimal': {

      addImportIfDoesNotExist.call(this, srcPath, 'java.math.BigDecimal');

      splicableText +=
        '\n\t\tsetup:\n' +
        '\t\t' + writeSaveRowToIntegration(this) + ' new BigDecimal(1.0)))\n' +
        '\t\t' + writeSaveRowToIntegration(this) + ' new BigDecimal(2.0)))\n';
      if(this.isPageable == 'yes') {
        splicableText +='\t\t' + writeSaveRowToIntegration(this) + ' new BigDecimal(1.0)));\n';
      }

      splicableText +=
        '\n\t\twhen:\n' +
        '\t\t' + writeFindRowToIntegration(this, 'new BigDecimal(1.0)') + '\n';
    }
      ;
      break;
    case 'Integer': {
      splicableText +=
        '\n\t\tsetup:\n' +
        '\t\t' + writeSaveRowToIntegration(this) + ' 1))\n' +
        '\t\t' + writeSaveRowToIntegration(this) + ' 2))\n';
      if(this.isPageable == 'yes') {
        splicableText +='\t\t' + writeSaveRowToIntegration(this) + ' 1));\n';
      }

      splicableText +=
        '\n\t\twhen:\n' +
        '\t\t' + writeFindRowToIntegration(this, '1') + '\n';
    }
      ;
      break;
    case 'Long': {
      splicableText +=
        '\n\t\tsetup:\n' +
        '\t\t' + writeSaveRowToIntegration(this) + ' 1L))\n' +
        '\t\t' + writeSaveRowToIntegration(this) + ' 2L))\n';
      if(this.isPageable == 'yes') {
        splicableText +='\t\t' + writeSaveRowToIntegration(this) + ' 1L));\n';
      }

      splicableText +=
        '\n\t\twhen:\n' +
        '\t\t' + writeFindRowToIntegration(this, '1L') + '\n';
    }
      ;
      break;
  }

  if (this.isPageable == 'yes') {
    splicableText +=
      '\n\t\tthen:\n' +
      '\t\trpage.getContent().size() == 2;\n';
  } else {
    splicableText +=
      '\n\t\tthen:\n' +
      '\t\trent != null\n';
  }

    splicableText +=
    '\n\t\tcleanup:\n' +
    '\t\tthis.' + _s.decapitalize(this.name) + 'Repository.deleteAll();\n' +
    '\t}\n';

    karbootutils.rewriteFile({
        file: srcPath,
        needle: 'kar-boot-find-by-needle',
        splicable: [splicableText]
    }, this);

}

function writeFiles() {
	return {
	  	appendEntity: function () {
	  		if (this.appendEntity == 'no') return;
		    var srcPath = 'src/main/java/' + this.packageFolder + '/entity/' + this.name + 'Entity.java';
		    writeEntityAndDto.call(this, srcPath);
		},
		appendDto: function () {
			if (this.appendEntity == 'no') return;
		    var srcPath = 'src/main/java/' + this.packageFolder + '/dto/' + this.name + 'Dto.java';
		    writeEntityAndDto.call(this, srcPath);
		},
		appendRepository: function () {
			if (this.appendRepository == 'no') return;
			var srcPath = 'src/main/java/' + this.packageFolder + '/resource/' + this.name + 'Repository.java';
			importPageAndPageableIfNotExists.call(this, srcPath);
			writeEntityInterface.call(this, srcPath);

			var testPath = 'src/integration/groovy/' + this.packageFolder + '/it/resource/' + this.name + 'RepoItSpec.groovy';
			if (this.isPageable == 'yes') {
				importPageAndPageableIfNotExists.call(this, testPath);
			}
      writeIntegrationFindAllTest.call(this, testPath);
		},
		appendBusiness: function () {
			if (this.appendBusiness == 'no') return;
			var srcPath = 'src/main/java/' + this.packageFolder + '/business/' + this.name + 'Business.java';
			importPageAndPageableIfNotExists.call(this, srcPath);
			writeEntityInterface.call(this, srcPath);

			var implSrcPath = 'src/main/java/' + this.packageFolder + '/business/impl/' + this.name + 'BusinessImpl.java';
			importPageAndPageableIfNotExists.call(this, implSrcPath);
			writeBusinessImplementation.call(this, implSrcPath);

			var implTestPath = 'src/test/groovy/' + this.packageFolder + '/unit/business/' + this.name + 'BusinessUnitSpec.groovy';
			if(this.isPageable == 'yes'){
        importPageAndPageableIfNotExists.call(this, implTestPath);
        addImportIfDoesNotExist.call(this, implTestPath, 'org.springframework.data.domain.PageRequest');
			  writeBusinessSpecForPageable.call(this, implTestPath)
      } else {
        writeBusinessSpec.call(this, implTestPath);
      }
		},
		appendFacade: function() {
			if (this.appendFacade == 'no') return;
			var srcPath = 'src/main/java/' + this.packageFolder + '/facade/' + this.name + 'Facade.java';
			importPageAndPageableIfNotExists.call(this, srcPath);
			writeFacadeInterface.call(this, srcPath);

			var implPath = 'src/main/java/' + this.packageFolder + '/facade/impl/' + this.name + 'FacadeImpl.java';
			importPageAndPageableIfNotExists.call(this, implPath);
			writeFacadeImplementation.call(this, implPath)

			var unitPath = 'src/test/groovy/' + this.packageFolder + '/unit/facade/' + this.name + 'FacadeUnitSpec.groovy';

      if(this.isPageable == 'yes'){
        addImportIfDoesNotExist.call(this, unitPath, 'org.springframework.data.domain.Page');
        addImportIfDoesNotExist.call(this, unitPath, 'org.springframework.data.domain.PageImpl');
        addImportIfDoesNotExist.call(this, unitPath, 'org.springframework.data.domain.PageRequest');
        writeFacadeSpecForPageable.call(this, unitPath)
      } else {
        writeFacadeSpec.call(this, unitPath);
      }
		},
    appendRest: function() {
      if (this.appendRest == 'no') return;
      var srcPath = 'src/main/java/' + this.packageFolder + '/web/' + this.name + 'Controller.java';
      importPageAndPageableIfNotExists.call(this, srcPath);
      addImportIfDoesNotExist.call(this, srcPath, 'org.springframework.data.web.PageableDefault');
      writeControllerImplementation.call(this, srcPath);
    }
	};
}
