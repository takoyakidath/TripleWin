import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { uuid, result, ip } = req.body;

        if (!uuid || !result || !ip) {
            return res.status(400).json({ error: 'UUID, result, and IP are required' });
        }

        const { data, error } = await supabase
            .from('game_results')
            .insert([{ uuid, result, ip }]);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ data });
    }
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
}
