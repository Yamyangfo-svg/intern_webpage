#!/bin/bash

# AWS ECR Deployment Script for AI Suite Application
# This script automates the deployment process to AWS ECR

set -e  # Exit on any error

# Configuration
AWS_REGION="ap-south-1"  # Change this to your preferred AWS region
ECR_REPOSITORY_NAME="my-web-page"
ACCOUNT_ID="131234316163"
IMAGE_TAG="latest"
APP_NAME="ai-suite"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== AWS ECR Deployment Script for AI Suite ===${NC}"
echo ""

# Function to check if AWS CLI is installed
check_aws_cli() {
    if ! command -v aws &> /dev/null; then
        echo -e "${RED}Error: AWS CLI is not installed. Please install it first.${NC}"
        echo "Install from: https://aws.amazon.com/cli/"
        exit 1
    fi
    echo -e "${GREEN}✓ AWS CLI is installed${NC}"
}

# Function to check if Docker is installed and running
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}Error: Docker is not installed. Please install it first.${NC}"
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        echo -e "${RED}Error: Docker is not running. Please start Docker Desktop.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Docker is installed and running${NC}"
}

# Function to check AWS credentials
check_aws_credentials() {
    if ! aws sts get-caller-identity &> /dev/null; then
        echo -e "${RED}Error: AWS credentials are not configured or invalid.${NC}"
        echo "Please run: aws configure"
        exit 1
    fi
    
    echo -e "${GREEN}✓ AWS credentials are configured${NC}"
    echo -e "${BLUE}Account ID: ${ACCOUNT_ID}${NC}"
}

# Function to create ECR repository if it doesn't exist
create_ecr_repository() {
    echo -e "${YELLOW}Checking if ECR repository exists...${NC}"
    
    if aws ecr describe-repositories --repository-names ${ECR_REPOSITORY_NAME} --region ${AWS_REGION} &> /dev/null; then
        echo -e "${GREEN}✓ ECR repository '${ECR_REPOSITORY_NAME}' already exists${NC}"
    else
        echo -e "${YELLOW}Creating ECR repository '${ECR_REPOSITORY_NAME}'...${NC}"
        aws ecr create-repository \
            --repository-name ${ECR_REPOSITORY_NAME} \
            --region ${AWS_REGION} \
            --image-scanning-configuration scanOnPush=true \
            --encryption-configuration encryptionType=AES256
        echo -e "${GREEN}✓ ECR repository created successfully${NC}"
    fi
}

# Function to get ECR login token
ecr_login() {
    echo -e "${YELLOW}Logging in to Amazon ECR...${NC}"
    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
    echo -e "${GREEN}✓ Successfully logged in to ECR${NC}"
}

# Function to build Docker image
build_image() {
    echo -e "${YELLOW}Building Docker image...${NC}"
    
    # Build the image
    docker build -t ${ECR_REPOSITORY_NAME}:${IMAGE_TAG} .
    
    # Tag for ECR
    docker tag ${ECR_REPOSITORY_NAME}:${IMAGE_TAG} ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}:${IMAGE_TAG}
    
    echo -e "${GREEN}✓ Docker image built and tagged successfully${NC}"
}

# Function to push image to ECR
push_image() {
    echo -e "${YELLOW}Pushing image to ECR...${NC}"
    
    docker push ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}:${IMAGE_TAG}
    
    echo -e "${GREEN}✓ Image pushed to ECR successfully${NC}"
}

# Function to display deployment information
display_info() {
    echo ""
    echo -e "${BLUE}=== Deployment Complete ===${NC}"
    echo -e "${GREEN}✓ Your AI Suite application has been deployed to AWS ECR${NC}"
    echo ""
    echo -e "${BLUE}Repository URI:${NC} ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}"
    echo -e "${BLUE}Image URI:${NC} ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}:${IMAGE_TAG}"
    echo -e "${BLUE}Region:${NC} ${AWS_REGION}"
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo "1. Use the Image URI above to deploy to ECS, EKS, or other AWS services"
    echo "2. Configure environment variables as needed"
    echo "3. Set up load balancer and auto-scaling if required"
    echo ""
    echo -e "${BLUE}To pull this image later:${NC}"
    echo "docker pull ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}:${IMAGE_TAG}"
}

# Main execution
main() {
    echo -e "${BLUE}Starting deployment process...${NC}"
    echo ""
    
    # Run all checks and deployment steps
    check_aws_cli
    check_docker
    check_aws_credentials
    create_ecr_repository
    ecr_login
    build_image
    push_image
    display_info
    
    echo -e "${GREEN}Deployment completed successfully! 🚀${NC}"
}

# Run the main function
main