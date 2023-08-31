import { json } from '@sveltejs/kit';

export async function GET({ setHeaders }) {
    setHeaders({
        "cache-control": "max-age=3600",
    });

    const getCats = await fetch('https://api.thecatapi.com/v1/breeds');
    const cats = await getCats.json();
    console.log('first cat id from /api', cats[0].id)

    return json(cats);
};