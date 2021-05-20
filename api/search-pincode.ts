import { VercelRequest, VercelResponse } from '@vercel/node';
import { pincodes } from './pincodes';
export default async (req: VercelRequest, res: VercelResponse) => {
    res.json({ message: pincodes[0] });
};
