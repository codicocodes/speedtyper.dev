import { GatewayMetadata } from '@nestjs/websockets';

export const getAllowedOrigins = () => {
  return process.env.NODE_ENV === 'production'
    ? ['https://speedtyper.dev', 'https://www.speedtyper.dev']
    : ['http://localhost:3001'];
};

export const socketCors: GatewayMetadata = {
  cors: {
    origin: getAllowedOrigins(),
    methods: ['GET', 'POST'],
    credentials: true,
  },
};
