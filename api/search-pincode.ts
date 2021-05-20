import { VercelRequest, VercelResponse } from '@vercel/node';
import { pincodes , IPinCode} from './pincodes';
const uniquePinCodes = pincodes.filter((code: IPinCode, index: number) => index === pincodes.indexOf(code));
export default async (req: VercelRequest, res: VercelResponse) => {
    res.json({ uniquePinCodes });
};
