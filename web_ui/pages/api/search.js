import axios from 'axios';

export default async function handler(req, res) {
  var target = req.query.q;
  const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/tweets`;

  try {
    var response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (err) {
    console.error('error when invoking external API: ', url, ' error: ', err);
    res.status(400).json(err);
  }
}
