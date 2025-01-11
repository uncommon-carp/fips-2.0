import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import * as fs from 'fs';

export interface County {
  state: string;
  countyName: string; // County name
  abbrev: string; // State abbreviation
  fips: string; // FIPS code
}

// Define the type for the JSON structure
interface StateData {
  _name: string;
  _fips: string;
  _abbrev: string;
  [countyName: string]: string; // County name mapped to FIPS code
}

const client = new DynamoDBClient({ region: 'us-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'Counties';

const populateDynamoDb = async () => {
  try {
    // Load and type the JSON data
    const rawData: Record<string, StateData> = JSON.parse(
      fs.readFileSync('./fips_lookup_by_state.json', 'utf-8'),
    );

    const requests: { PutRequest: { Item: County } }[] = [];
    for (const [stateAbbrev, stateInfo] of Object.entries(rawData)) {
      const stateName = stateInfo._name;

      for (const [countyName, countyFips] of Object.entries(stateInfo)) {
        if (countyName.startsWith('_')) continue; // Skip metadata keys

        const county: County = {
          state: stateName,
          countyName: countyName,
          abbrev: stateAbbrev,
          fips: countyFips,
        };

        requests.push({
          PutRequest: {
            Item: county,
          },
        });

        // Batch size limit is 25
        if (requests.length === 25) {
          await writeBatchToDynamo(requests);
          requests.length = 0; // Clear the batch
        }
      }
    }

    // Write remaining requests if any
    if (requests.length > 0) {
      await writeBatchToDynamo(requests);
    }

    console.log('Data successfully populated!');
  } catch (error) {
    console.error('Error populating data:', error);
  }
};

const writeBatchToDynamo = async (
  requests: { PutRequest: { Item: County } }[],
) => {
  try {
    const params = {
      RequestItems: {
        [TABLE_NAME]: requests,
      },
    };
    await ddbDocClient.send(new BatchWriteCommand(params));
  } catch (error) {
    console.error('Error writing batch to DynamoDB:', error);
    throw error;
  }
};

populateDynamoDb();
