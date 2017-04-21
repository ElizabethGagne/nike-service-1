
module.exports = {
    writeFiles
};

function writeFiles() {
    return {
        writeDeployments() {
            const appName = this.dasherizedBaseName;
            this.app = this;
            this.template('_CreateDeployment.groovy', 'pipeline/jobs/CreateDeployment.groovy');
            this.template('_PreConfigure.groovy', 'pipeline/jobs/PreConfigure.groovy');
            this.template('_set_up_jobs.dsl', 'pipeline/jobs/set_up_jobs.dsl');
            this.template('_UpdateService.groovy', 'pipeline/jobs/UpdateService.groovy');
            this.template('_pre-configure.sh', 'pipeline/resources/pre-configure.sh');
            this.template('_README.md', 'pipeline/README.md');
        }
    };
}
