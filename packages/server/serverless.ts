import { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'server',

  frameworkVersion: '4',

  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'us-east-1',
    httpApi: {
      cors: true,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: 'DynamoDB:*',
            Resource: `arn:aws:dynamodb:us-east-1:${process.env.AWS_ACCOUNT_ID}:table/Counties`,
          },
          {
            Effect: 'Allow',
            Action: ['s3:PutObject', 's3:GetObject', 's3:ListBucket'],
            Resource: [
              'arn:aws:s3:::county-bucket',
              'arn:aws:s3:::county-bucket/*',
            ],
          },
        ],
      },
    },
  },

  custom: {
    webpack: {
      webpackConfig: './webpack.sls.ts',
    },
    memory: {
      prd: 1536,
      other: 1024, // default lambda memorySize
    },
    prune: {
      automatic: true,
      number: 5,
    },
  },

  functions: {
    getAllCounties: {
      handler: 'src/server.getAllCounties',
      events: [
        {
          httpApi: {
            path: '/counties',
            method: 'GET',
          },
        },
      ],
    },
    getCountyByName: {
      handler: 'src/server.getCountyByName',
      events: [
        {
          httpApi: {
            path: '/counties/{name}/{state}',
            method: 'GET',
          },
        },
      ],
    },
    getCountiesByState: {
      handler: 'src/server.getCountiesByState',
      events: [
        {
          httpApi: {
            path: '/counties/{state}',
            method: 'GET',
          },
        },
      ],
    },
  },

  resources: {
    Resources: {
      CountyTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'Counties',
          AttributeDefinitions: [
            { AttributeName: 'state', AttributeType: 'S' },
            { AttributeName: 'countyName', AttributeType: 'S' },
          ],
          KeySchema: [
            { AttributeName: 'state', KeyType: 'HASH' },
            { AttributeName: 'countyName', KeyType: 'RANGE' },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
      CountyBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: 'county-bucket',
          PublicAccessBlockConfiguration: {
            BlockPublicAcls: true,
            BlockPublicPolicy: true,
            IgnorePublicAcls: true,
            RestrictPublicBuckets: true,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
