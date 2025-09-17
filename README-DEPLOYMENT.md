# AWS ECR Deployment Guide for AI Suite Application

This guide provides step-by-step instructions to deploy your Next.js AI Suite application to AWS ECR (Elastic Container Registry).

## Prerequisites

Before starting the deployment, ensure you have:

1. **AWS Account** - Active AWS account with appropriate permissions
2. **AWS CLI** - Installed and configured
3. **Docker** - Installed and running on your machine
4. **Git** - For version control (optional but recommended)

## Quick Start Deployment

### Option 1: Automated Script Deployment (Recommended)

#### For Windows:
```bash
# Navigate to your project directory
cd c:\Users\ASUS\OneDrive\Desktop\textsummarise

# Run the Windows deployment script
deploy-to-ecr.bat
```

#### For Linux/macOS:
```bash
# Navigate to your project directory
cd /path/to/your/project

# Make the script executable
chmod +x deploy-to-ecr.sh

# Run the deployment script
./deploy-to-ecr.sh
```

### Option 2: Manual Step-by-Step Deployment

If you prefer to run commands manually, follow these steps:

#### Step 1: Install and Configure Prerequisites

1. **Install AWS CLI**
   ```bash
   # Download from: https://aws.amazon.com/cli/
   # Verify installation
   aws --version
   ```

2. **Configure AWS CLI**
   ```bash
   aws configure
   # Enter your:
   # - AWS Access Key ID
   # - AWS Secret Access Key
   # - Default region (e.g., us-east-1)
   # - Output format (json)
   ```

3. **Install Docker**
   - Download Docker Desktop from: https://www.docker.com/products/docker-desktop
   - Start Docker Desktop
   - Verify: `docker --version`

#### Step 2: Prepare Your Application

1. **Navigate to your project directory**
   ```bash
   cd c:\Users\ASUS\OneDrive\Desktop\textsummarise
   ```

2. **Test your application locally**
   ```bash
   npm install
   npm run build
   npm start
   ```

#### Step 3: Set Up AWS ECR

1. **Get your AWS Account ID**
   ```bash
   aws sts get-caller-identity --query Account --output text
   ```

2. **Create ECR Repository**
   ```bash
   aws ecr create-repository \
       --repository-name ai-suite-app \
       --region us-east-1 \
       --image-scanning-configuration scanOnPush=true
   ```

3. **Login to ECR**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com
   ```

#### Step 4: Build and Push Docker Image

1. **Build the Docker image**
   ```bash
   docker build -t ai-suite-app:latest .
   ```

2. **Tag the image for ECR**
   ```bash
   docker tag ai-suite-app:latest <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/ai-suite-app:latest
   ```

3. **Push the image to ECR**
   ```bash
   docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/ai-suite-app:latest
   ```

## Configuration Options

### Environment Variables

You can customize the deployment by modifying these variables in the deployment scripts:

- `AWS_REGION`: Your preferred AWS region (default: us-east-1)
- `ECR_REPOSITORY_NAME`: Name of your ECR repository (default: ai-suite-app)
- `IMAGE_TAG`: Tag for your Docker image (default: latest)

### Dockerfile Customization

The included Dockerfile is optimized for production. Key features:

- **Multi-stage build**: Optimized for smaller image size
- **Security**: Non-root user execution
- **Performance**: Production-ready Node.js configuration
- **Port**: Exposes port 3000 (standard for Next.js)

## Deployment Verification

After successful deployment, verify your image in AWS:

1. **AWS Console**
   - Go to AWS ECR service
   - Find your repository: `ai-suite-app`
   - Verify the image with `latest` tag

2. **CLI Verification**
   ```bash
   aws ecr describe-images --repository-name ai-suite-app --region us-east-1
   ```

## Next Steps After ECR Deployment

Once your image is in ECR, you can deploy it to various AWS services:

### 1. AWS ECS (Elastic Container Service)
- Create an ECS cluster
- Define a task definition using your ECR image URI
- Create a service to run your containers

### 2. AWS EKS (Elastic Kubernetes Service)
- Create Kubernetes deployment manifests
- Use your ECR image URI in the deployment

### 3. AWS Fargate
- Serverless container deployment
- No infrastructure management required

### 4. AWS App Runner
- Fully managed container service
- Automatic scaling and load balancing

## Troubleshooting Common Issues

### 1. Docker Not Running
```
Error: Cannot connect to the Docker daemon
Solution: Start Docker Desktop
```

### 2. AWS Credentials Not Configured
```
Error: Unable to locate credentials
Solution: Run 'aws configure' and enter your credentials
```

### 3. ECR Repository Already Exists
```
Error: Repository already exists
Solution: This is not an error - the script will use the existing repository
```

### 4. Build Failures
```
Error: Build failed
Solution: Check that all dependencies are properly installed
Run: npm install && npm run build
```

### 5. Push Permission Denied
```
Error: Access denied
Solution: Ensure your AWS user has ECR permissions:
- AmazonEC2ContainerRegistryFullAccess
- Or custom policy with ECR push permissions
```

## Security Best Practices

1. **Use specific image tags** instead of `latest` for production
2. **Enable image scanning** in ECR (included in the script)
3. **Use least privilege IAM policies**
4. **Regularly update base images** for security patches
5. **Store secrets in AWS Secrets Manager** or Parameter Store

## Cost Optimization Tips

1. **Image lifecycle policies**: Automatically delete old images
2. **Compress layers**: Use multi-stage builds (already implemented)
3. **Regional deployment**: Deploy in the region closest to your users
4. **Monitor usage**: Use AWS Cost Explorer to track ECR costs

## Support Resources

If you encounter issues:

1. Check the troubleshooting section above
2. Review AWS CloudTrail logs for API errors
3. Verify your AWS permissions
4. Ensure Docker is running and has sufficient resources

## Files Included in This Deployment

This deployment setup creates the following files:

- `Dockerfile`: Container definition for your application
- `.dockerignore`: Files to exclude from Docker build context
- `deploy-to-ecr.sh`: Linux/macOS deployment script
- `deploy-to-ecr.bat`: Windows deployment script
- `README-DEPLOYMENT.md`: This documentation file

Your AI Suite application is now ready for AWS ECR deployment! 🚀