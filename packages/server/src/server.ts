import { APIGatewayProxyHandler } from 'aws-lambda';

export const getAllCounties: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ counties: ['hello'] }),
  };
};
