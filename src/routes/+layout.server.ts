import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    console.log('layout load');
    const getCats = await fetch('https://api.thecatapi.com/v1/breeds');
    const cats = await getCats.json();
    console.log('first cat id from layout', cats[0].id)
    return { cats };
}) satisfies LayoutServerLoad;