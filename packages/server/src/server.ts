import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '@fips/shared';

const s3 = getS3Client();

const bucketName = 'county-bucket';
const key = 'fips_lookup_by_state.json';

export const getAllCounties: APIGatewayProxyHandler = async () => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const response = await s3.send(command);

    if (response.Body) {
      const fileContent = await response.Body?.transformToString();

      return {
        statusCode: 200,
        body: fileContent,
      };
    } else {
      console.log('Error retrieving for processing the file');
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      };
    }
  } catch (error) {
    console.error('Error retrieving or processing the file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export const getCountyByName: APIGatewayProxyHandler = (
  event: APIGatewayProxyEvent,
) => {};
