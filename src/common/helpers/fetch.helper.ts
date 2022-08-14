import axios from 'axios';

export const fetchData = async (url: string) => {
  const result = await axios.get(url);

  if (result && result.status === 200 && result.data) {
    return result.data;
  }

  return null;
};
