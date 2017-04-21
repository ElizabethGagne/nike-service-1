const _ = require('lodash');

module.exports = {
  askForGitRepoURL
};

function askForGitRepoURL() {
  const done = this.async();

  const prompts = [{
    type: 'input',
    name: 'gitURL',
    message: 'What is your git Repository URL (i.e https://github.com/<username>/microserviceTest1?)',
    default: this.gitURL
  }];

  this.prompt(prompts).then((props) => {
    this.gitURL = props.gitURL;
    done();
  });
}
