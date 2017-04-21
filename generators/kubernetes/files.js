
module.exports = {
    writeFiles
};

function writeFiles() {
    return {
        writeDeployments() {
            const appName = this.dasherizedBaseName;
            this.app = this;
            this.template('_kubernetes.yml', `kubernetes/${appName}-app.yml`);

            if (this.datastore) {
                this.template(`db/_${this.datastore}.yml`, `kubernetes/${appName}-${this.datastore}.yml`);
            }
        }
    };
}
