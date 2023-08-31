export async function handleFetch({ request, fetch }) {
    // nothing happens
    console.log('handleFetch', request.url);
    return fetch(request);
}