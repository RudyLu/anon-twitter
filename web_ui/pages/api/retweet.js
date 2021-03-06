import axios from 'axios';

export default async function handler(req, res) {
  const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/tweets/retweet`;

  try {
    var response = await axios.post(url, req.body);
    res.status(200).json(response.data);
  } catch (err) {
    console.error('error when invoking external API: ', url, ' error: ', err);
    res.status(400).json(err);
  }
}
