import { S3Client } from '@aws-sdk/client-s3';

export function getS3Client() {
  return new S3Client({ region: 'us-east-1' });
}
