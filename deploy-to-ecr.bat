@echo off
REM AWS ECR Deployment Script for AI Suite Application (Windows)
REM This script automates the deployment process to AWS ECR

setlocal enabledelayedexpansion

REM Configuration
set AWS_REGION=ap-south-1
set ECR_REPOSITORY_NAME=my-web-page
set ACCOUNT_ID=131234316163
set IMAGE_TAG=latest
set APP_NAME=ai-suite

echo === AWS ECR Deployment Script for AI Suite ===
echo.

REM Function to check if AWS CLI is installed
echo Checking AWS CLI installation...
aws --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: AWS CLI is not installed. Please install it first.
    echo Install from: https://aws.amazon.com/cli/
    pause
    exit /b 1
)
echo ✓ AWS CLI is installed

REM Function to check if Docker is installed and running
echo Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not installed. Please install it first.
    pause
    exit /b 1
)

docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)
echo ✓ Docker is installed and running

REM Function to check AWS credentials
echo Checking AWS credentials...
aws sts get-caller-identity >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: AWS credentials are not configured or invalid.
    echo Please run: aws configure
    pause
    exit /b 1
)
echo ✓ AWS credentials are configured
echo Account ID: %ACCOUNT_ID%

REM Function to create ECR repository if it doesn't exist
echo Checking if ECR repository exists...
aws ecr describe-repositories --repository-names %ECR_REPOSITORY_NAME% --region %AWS_REGION% >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ ECR repository '%ECR_REPOSITORY_NAME%' already exists
) else (
    echo Creating ECR repository '%ECR_REPOSITORY_NAME%'...
    aws ecr create-repository ^
        --repository-name %ECR_REPOSITORY_NAME% ^
        --region %AWS_REGION% ^
        --image-scanning-configuration scanOnPush=true ^
        --encryption-configuration encryptionType=AES256
    if %errorlevel% neq 0 (
        echo Error: Failed to create ECR repository
        pause
        exit /b 1
    )
    echo ✓ ECR repository created successfully
)

REM Function to get ECR login token
echo Logging in to Amazon ECR...
for /f "tokens=*" %%i in ('aws ecr get-login-password --region %AWS_REGION%') do set LOGIN_PASSWORD=%%i
echo !LOGIN_PASSWORD! | docker login --username AWS --password-stdin !ACCOUNT_ID!.dkr.ecr.%AWS_REGION%.amazonaws.com
if %errorlevel% neq 0 (
    echo Error: Failed to login to ECR
    pause
    exit /b 1
)
echo ✓ Successfully logged in to ECR

REM Function to build Docker image
echo Building Docker image...
docker build -t %ECR_REPOSITORY_NAME%:%IMAGE_TAG% .
if %errorlevel% neq 0 (
    echo Error: Failed to build Docker image
    pause
    exit /b 1
)

docker tag %ECR_REPOSITORY_NAME%:%IMAGE_TAG% !ACCOUNT_ID!.dkr.ecr.%AWS_REGION%.amazonaws.com/%ECR_REPOSITORY_NAME%:%IMAGE_TAG%
if %errorlevel% neq 0 (
    echo Error: Failed to tag Docker image
    pause
    exit /b 1
)
echo ✓ Docker image built and tagged successfully

REM Function to push image to ECR
echo Pushing image to ECR...
docker push !ACCOUNT_ID!.dkr.ecr.%AWS_REGION%.amazonaws.com/%ECR_REPOSITORY_NAME%:%IMAGE_TAG%
if %errorlevel% neq 0 (
    echo Error: Failed to push image to ECR
    pause
    exit /b 1
)
echo ✓ Image pushed to ECR successfully

REM Display deployment information
echo.
echo === Deployment Complete ===
echo ✓ Your AI Suite application has been deployed to AWS ECR
echo.
echo Repository URI: !ACCOUNT_ID!.dkr.ecr.%AWS_REGION%.amazonaws.com/%ECR_REPOSITORY_NAME%
echo Image URI: !ACCOUNT_ID!.dkr.ecr.%AWS_REGION%.amazonaws.com/%ECR_REPOSITORY_NAME%:%IMAGE_TAG%
echo Region: %AWS_REGION%
echo.
echo Next Steps:
echo 1. Use the Image URI above to deploy to ECS, EKS, or other AWS services
echo 2. Configure environment variables as needed
echo 3. Set up load balancer and auto-scaling if required
echo.
echo To pull this image later:
echo docker pull !ACCOUNT_ID!.dkr.ecr.%AWS_REGION%.amazonaws.com/%ECR_REPOSITORY_NAME%:%IMAGE_TAG%
echo.
echo Deployment completed successfully! 🚀
pause