import { CellQuery } from './types';
import { handler } from './index';
import { APIGatewayProxyEvent } from 'aws-lambda';

const cellQuery: CellQuery = {
  minLat: 89,
  maxLat: 90,
  minLng: 36,
  maxLng: 37
};

handler({
  body: JSON.stringify(cellQuery, null, 2),
  path: '/cell-query'
} as APIGatewayProxyEvent)