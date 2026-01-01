export const workshop = {
  id: "intro-to-serverless",
  title: "Introduction to Serverless on AWS",
  description: "Learn the fundamentals of serverless architecture.",

  chapters: [
    {
      id: "ch1",
      title: "Getting Started",
      lessons: [
        {
          id: "l1",
          title: "What is Serverless?",
          content: `
# What is Serverless?

Serverless computing is a cloud execution model where the cloud provider dynamically manages the allocation of servers.

## Key Characteristics

Despite the name, servers are still involved — you just don't manage them:

- **No server management**: AWS handles all infrastructure
- **Automatic scaling**: Resources scale with demand
- **Pay-per-use**: You only pay for what you consume

## AWS Serverless Services

| Service | Purpose |
|---------|---------|
| Lambda | Run code without servers |
| API Gateway | Create HTTP endpoints |
| DynamoDB | NoSQL database |
| S3 | Object storage |

In the next lesson, we'll explore AWS Lambda in detail.
`,
        },
        {
          id: "l2",
          title: "AWS Lambda Basics",
          content: `
# AWS Lambda Basics

AWS Lambda lets you run code without provisioning servers.

## How Lambda Works

1. **Trigger**: Something invokes your function
2. **Execute**: Lambda runs your code
3. **Scale**: Lambda creates instances as needed

## Your First Lambda Function

\`\`\`python
import json

def lambda_handler(event, context):
    name = event.get('name', 'World')
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': f'Hello, {name}!'
        })
    }
\`\`\`

## Key Concepts

### Cold Starts
When Lambda creates a new execution environment, there's a brief delay called a "cold start."

### Execution Role
Every Lambda function needs an IAM role that defines what AWS resources it can access.
`,
        },
      ],
    },
    {
      id: "ch2",
      title: "Building APIs",
      lessons: [
        {
          id: "l1",
          title: "API Gateway Overview",
          content: `
# API Gateway Overview

Amazon API Gateway is a fully managed service for creating and managing APIs.

## API Types

### REST APIs
- Traditional RESTful APIs
- Full feature set including caching and validation

### HTTP APIs
- Simpler and cheaper
- Best for Lambda backends
- Up to 71% cost savings vs REST APIs

## Architecture Pattern

\`\`\`
Client → API Gateway → Lambda → DynamoDB
\`\`\`
`,
        },
        {
          id: "l2",
          title: "Lambda Integration",
          content: `
# Lambda + API Gateway Integration

Let's connect Lambda to API Gateway.

## Lambda Proxy Integration

API Gateway passes the entire request to Lambda:

\`\`\`python
def handler(event, context):
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({'message': 'Success!'})
    }
\`\`\`

## Event Structure

\`\`\`json
{
  "httpMethod": "GET",
  "path": "/items/123",
  "pathParameters": { "id": "123" },
  "headers": { "Authorization": "Bearer token..." }
}
\`\`\`
`,
        },
      ],
    },
  ],
};
