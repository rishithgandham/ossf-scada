// pages/api/arduinoToken.ts
import { NextApiRequest, NextApiResponse } from 'next';

const getToken = async (): Promise<string> => {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.ARDUINO_API_CLIENT_ID!,
    client_secret: process.env.ARDUINO_API_CLIENT_SECRET!,
    audience: 'https://api2.arduino.cc/iot',
  });

  const response = await fetch('https://api2.arduino.cc/iot/v1/clients/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Failed to obtain access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = await getToken();
    res.status(200).json({ access_token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
