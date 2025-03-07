import { ApiResponse } from '@/lib/ApiResponse';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { uuid, result, ip, userid } = req.body;

        if (!uuid || !result || !ip) {
            return res.status(400).json({ error: 'UUID, result, and IP are required' });
        }

        const insertData: { uuid: any; result: any; ip: any; userid?: any } = { uuid, result, ip };
        if (userid) {
            insertData.userid = userid;
        }

        const { error } = await supabase
            .from('game_results')
            .insert([insertData]);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ uuid, result, ip, userid });
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}