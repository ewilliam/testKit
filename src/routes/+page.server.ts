import type { PageServerLoad } from './$types';

export const load = (async ({ request }) => {
    console.log('page load');
    const getCats = await fetch('https://api.thecatapi.com/v1/breeds');
    const cats = await getCats.json();
    console.log('first cat id from page', cats[0].id)
    return { cats };
}) satisfies PageServerLoad;