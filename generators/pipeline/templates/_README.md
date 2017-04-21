Jenkins Pipeline
================
This directory is to automate the Jenkins Pipeline of the Microservice. For the moment only AWS ECR (Image Repository) and Kubernetes is supported.

### Pipeline Jobs

* (pipeline/jobs/PreConfigure.groovy)       - Groovy script calling pre-configure.sh scrip
* (pipeline/jobs/CreateDeployment.groovy)   - Groovy script deploying the microservice on Kubernetes 
* (pipeline/jobs/UpdateService.groovy) 	    - Groovy script updating the microservice image and doing a rolling update on Kubernetes 
* (pipeline/resources/pre-configure.sh)     - Bash script that will create a Repository in AWS ECR and bake/push the docker image of this microservice. 
* (pipeline/set_up_jobs.dsl)                - Definitions of the JobDsl jobs (pipelines skeleton)

### Create a Seed Job on Jenkins

You have to create the seed job manually by following those instructions in Jenkins:

* Create a Folder under the microservices Folder, New Item -> Item Name: `<%= dasherizedBaseName.toLowerCase() %>`, click 'Folder' radio button)
* Create Job, New Item -> Item Name: `seed`, click 'Freestyle project' radio button
* Source Code Management -> Git Repositories URL: `<%= gitURL %>`
* Build Triggers -> Poll SCM schedule: `H/5 * * * *`
* Add Build Steps, Process Job DSLs -> DSL Scripts: `pipeline/jobs/set_up_jobs.dsl`
