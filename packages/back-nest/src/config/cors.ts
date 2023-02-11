export const getAllowedOrigins = () => {
  return [
    process.env.NODE_ENV === 'production'
      ? 'https://speedtyper.dev'
      : 'http://localhost:3001',
  ];
};

export const socketCors = {
  cors: {
    origin: getAllowedOrigins(),
    methods: ['GET', 'POST'],
    credentials: true,
  },
};
