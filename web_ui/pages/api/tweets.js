import axios from 'axios';

export default async function handler(req, res) {
  const url = `http://localhost:3000/tweets`;

  try {
    var response = await axios.post(url, req.body);
    res.status(200).json(response.data);
  } catch (err) {
    console.error('error when invoking external API: ', url, ' error: ', err);
    res.status(400).json(err);
  }
}
