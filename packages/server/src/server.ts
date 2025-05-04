import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client, normalizeCountyName } from '@fips/shared';
import { getCountyByStateAndName } from './utils/getCountyByStateAndName';
import { getCountiesByState } from './utils/getCountiesByState';

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

export const searchHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => {
  if (!event.queryStringParameters) {
    return { statusCode: 400, body: 'Missing parameters in request' };
  }

  const { state, county } = event.queryStringParameters;

  console.log('Incoming event:\n', { searchParams: { state, county }, event });

  try {
    let result;
    if (state && county) {
      const normalized = normalizeCountyName(county, state === 'LOUISIANA');
      console.log({ normalized });
      result = await getCountyByStateAndName(state, normalized);
    } else if (state && !county) {
      result = await getCountiesByState(state);
    } else {
      return { statusCode: 400, body: 'Invalid query parameters' };
    }
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
