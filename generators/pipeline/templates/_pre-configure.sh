#!/bin/bash

USAGE="usage: ./pre-configure.sh"

# Global variables
PROJECT="microservices"
declare -a EXPECTED_REPOSITORIES=("<%= dasherizedBaseName.toLowerCase() %>")
AWS_DEFAULT_REGION=$(aws configure get default.region)
AWS_ACCOUNT_NUMBER=$(aws iam get-user | awk '/arn:aws:/{print $2}' | cut -d \: -f 5)


# Retrieve all existing ECR Repository into that AWS account
findAllExistingRepositories()
{
    ALL_ECR_REPOSITORIES=$(aws ecr describe-repositories --registry-id "${AWS_ACCOUNT_NUMBER}" | jq '.repositories[].repositoryName' | cut -d'"' -f2)
}


# Create necessary ECR repositories
createNecessaryRepositories()
{
    echo "Creating necessary ECR Repositories..."
    for repo in "${EXPECTED_REPOSITORIES[@]}"
    do
         FOUND=false
         REPOSITORY=$PROJECT"/"$repo

         case "${ALL_ECR_REPOSITORIES[@]}" in  *$REPOSITORY*)
            FOUND=true;;
         esac

         if [ "${FOUND}" = false ]; then
            echo "Creating ${REPOSITORY} repository"
            aws ecr create-repository --repository-name "${REPOSITORY}"
            STATUS=$?

            if [ "${STATUS}" -ne 0 ]; then
                echo "ERROR: Creating the ECR Repository ${REPOSITORY} failed."
                exit "${STATUS}"
            fi
         fi
    done
}

# bake Image for the microservice
bakeImages()
{
    echo "Baking Docker Image for the microservice..."

    for dir in "${EXPECTED_REPOSITORIES[@]}"
    do
        echo "Baking Image for microservice ${dir}"
        docker build -t "${PROJECT}"/"${dir}" ../../
    done
}

# Tag and Push Latest Images to ECR
tagAndPushLatestImagesToECR()
{
    echo "Tagging and pushing Latests Images to ECR..."
    for repo in "${EXPECTED_REPOSITORIES[@]}"
    do
        REPOSITORY="${PROJECT}/${repo}"

        echo "Tagging Image ${REPOSITORY}:latest"
        TAG="${AWS_ACCOUNT_NUMBER}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${REPOSITORY}:latest"

        echo "Pushing Image ${REPOSITORY}:latest to ECR repository"
        docker tag "${REPOSITORY}:latest" "${TAG}"
        docker push "${TAG}"
    done
}

# Authenticate to ECR Docker Registry
loginToECR()
{
    echo "Authenticating to ECR..."
    LOGIN_CMD=$(aws ecr get-login --region "${AWS_DEFAULT_REGION}")
    eval "${LOGIN_CMD}"
}


findAllExistingRepositories
createNecessaryRepositories
bakeImages
loginToECR
tagAndPushLatestImagesToECR

echo "Pre-configuration completed successfully"




