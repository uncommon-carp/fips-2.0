import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '@fips/shared';
import { fetchS3Object } from '@fips/shared/src/utils/s3/fetchS3Object';
import Fuse from 'fuse.js';

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

export const getCountyByName: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => {
  if (
    !event.pathParameters ||
    !event.pathParameters.state ||
    !event.pathParameters.county
  ) {
    return { statusCode: 504, body: 'Missing parameters in request' };
  }

  try {
    let counties = [];
    const fileContent = await fetchS3Object(bucketName, 'fips_list.json');
    if (typeof fileContent === 'string') {
      counties = await JSON.parse(fileContent);
    }
    const fuse = new Fuse(counties, { keys: ['state', 'county'] });

    const { state, county } = event.pathParameters;

    const result = fuse.search({ state, county });

    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
