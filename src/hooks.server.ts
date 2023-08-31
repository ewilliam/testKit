export async function handle({ event, resolve }) {
    // only this will trigger handleFetch
    // but fetch here in handle will also crash the app
    // const fetchReq = await event.fetch('/api');
    const response = await resolve(event);
    return response;
}

export async function handleFetch({ request, fetch }) {
    // nothing happens
    console.log('handleFetch', request.url);
    return fetch(request);
}