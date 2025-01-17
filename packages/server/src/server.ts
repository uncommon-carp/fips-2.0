import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '@fips/shared';
import { Readable } from 'stream';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const s3 = getS3Client();
const client = new DynamoDBClient({ region: 'us-east-1' });
const db = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

export interface County {
  state: string;
  name: string; // County name
  abbrev: string; // State abbreviation
  fips: string; // FIPS code
}

interface StateData {
  _name: string; // Full state name
  _fips: string; // State FIPS code
  _abbrev: string; // State abbreviation
  [countyName: string]: string; // Other keys (county names) map to FIPS codes
}

export const getAllCounties: APIGatewayProxyHandler = async () => {
  const bucketName = 'county-bucket';
  const key = 'fips_lookup_by_state.json';

  try {
    // Retrieve the JSON file from S3
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const response = await s3.send(command);

    // Convert the S3 object stream to a string
    const streamToString = (stream: Readable): Promise<string> =>
      new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () =>
          resolve(Buffer.concat(chunks).toString('utf-8')),
        );
        stream.on('error', reject);
      });

    const fileContent = await streamToString(response.Body as Readable);

    // Parse the JSON file and transform it into an array of County objects
    const rawData: Record<string, StateData> = JSON.parse(fileContent);

    const counties: County[] = [];
    for (const [stateAbbrev, stateInfo] of Object.entries(rawData)) {
      const stateName = stateInfo._name;

      for (const [countyName, countyFips] of Object.entries(stateInfo)) {
        if (countyName.startsWith('_')) continue; // Skip metadata keys

        counties.push({
          state: stateName,
          name: countyName,
          abbrev: stateAbbrev,
          fips: countyFips,
        });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(counties),
    };
  } catch (error) {
    console.error('Error retrieving or processing the file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to retrieve county data.' }),
    };
  }
};

export const getCountiesByState: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => {
  let { state } = event.pathParameters || {};

  if (!state) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'State parameter is required.' }),
    };
  }

  state = state
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const params = {
    TableName: 'Counties',
    KeyConditionExpression: '#state = :state',
    ExpressionAttributeNames: {
      '#state': 'state',
    },
    ExpressionAttributeValues: marshall({
      ':state': state,
    }),
  };

  try {
    // Query DynamoDB for all counties in the specified state
    const command = new QueryCommand(params);
    const response = await db.send(command);

    if (!response.Items || response.Items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `No counties found for state: ${state}`,
        }),
      };
    }

    const counties = response.Items.map((item) => unmarshall(item) as County);

    return {
      statusCode: 200,
      body: JSON.stringify(counties),
    };
  } catch (error) {
    console.error('Error querying counties by state:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to retrieve counties.' }),
    };
  }
};
