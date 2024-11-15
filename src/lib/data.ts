import { createClient } from '@supabase/supabase-js';

export async function saveScore(team: string, name: string, score: number) {
    try {
        const supabase = createClient('https://phfllbfvtccryshrtxgo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZmxsYmZ2dGNjcnlzaHJ0eGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2MjQ1ODgsImV4cCI6MjA0NzIwMDU4OH0.ccaA_4cInFE_FJestHHjtdc2tHNmO03GDOXt_pOyotA');

        await supabase.from('scores').insert({ name: name, team: 'apple', score: score }).select();
    } catch (e) {
        console.log(e);
    }
}
export async function loadScores(team: string) {
    try {
        const supabase = createClient('https://phfllbfvtccryshrtxgo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZmxsYmZ2dGNjcnlzaHJ0eGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2MjQ1ODgsImV4cCI6MjA0NzIwMDU4OH0.ccaA_4cInFE_FJestHHjtdc2tHNmO03GDOXt_pOyotA');

        return await supabase.from('scores').select('*').eq('team', team).order('name', { ascending: true });
    } catch (e) {
        console.log(e);
    }
}