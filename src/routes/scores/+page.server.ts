import { loadScores } from '$lib/data';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const { data } = await loadScores("bananacream");
    return { scores: data };
});