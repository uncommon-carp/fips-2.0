import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

export const fetchS3Object = async (
  bucketName: string,
  key: string,
  s3 = new S3Client({ region: 'us-east-1' }),
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  const response = await s3.send(command);

  if (response.Body) {
    const fileContent = await response.Body?.transformToString();

    return fileContent;
  }

  throw new Error('Failed to process S3 object');
};
