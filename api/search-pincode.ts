import { VercelRequest, VercelResponse } from '@vercel/node';
import { pincodes } from './pincodes';
const flags: Record<string, boolean> = {};
const uniquePinCodes = pincodes.filter(code => {
    if(flags[code.Pincode]) {
        return false;
    }
    flags[code.Pincode] = true;
    return true;
})
export default async (req: VercelRequest, res: VercelResponse) => {
    const {code} = req.body;
    res.json({ results: uniquePinCodes.filter(({Pincode}) => Pincode.includes(code)) });
};
