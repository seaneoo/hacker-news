import fetch from 'node-fetch';

const get = async (url: string): Promise<any> => {
  return await fetch(url)
    .then((res) => res.json())
    .then((json) => json);
};

export { get };
