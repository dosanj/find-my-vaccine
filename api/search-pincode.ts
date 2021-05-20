import { VercelRequest, VercelResponse } from '@vercel/node';
import pincodeDirectory from 'india-pincode-lookup';
export default async (req: VercelRequest, res: VercelResponse) => {
    res.json({ message: pincodeDirectory.lookup(445204) });
};
