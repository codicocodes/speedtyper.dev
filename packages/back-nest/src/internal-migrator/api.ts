import fetch from 'node-fetch';

const BASE_URL = process.env.INTERNAL_API_BASE_URL;

export const INTERNAL_USERS_STREAM_API = BASE_URL + '/internal/users';

export const INTERNAL_RESULTS_STREAM_API = BASE_URL + '/internal/results';

export async function streamLegacyData(
  endpoint: string,
  processData: (data: any) => Promise<void>,
) {
  const internalToken = process.env.INTERNAL_API_TOKEN;
  const headers = {
    'api-token': internalToken,
  };
  const stream = await fetch(endpoint, { headers }).then((res: any) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.body;
  });
  await new Promise<void>((resolve) => {
    const promises = [];
    stream.on('readable', async function () {
      let chunk;
      while (null !== (chunk = stream.read())) {
        const stringData = chunk.toString();
        const data = parseJson(stringData);
        promises.push(processData(data));
      }
    });
    stream.on('end', async () => {
      await Promise.all(promises);
      resolve();
    });
  });
}

function parseJson(strData: string) {
  try {
    const data = JSON.parse(strData);
    return [data];
  } catch (err) {
    const data = strData.split('}{').map((str) => {
      if (!str.startsWith('{')) str = '{' + str;
      if (!str.endsWith('}')) str = str + '}';
      return JSON.parse(str);
    });
    return data;
  }
}
