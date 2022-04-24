/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    //event.locals.user = await getUserInformation(event.request.headers.get('cookie'));
   
    const response = await resolve(event);
    return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
/*export function getSession(event) {
    return event.locals.user
    ? {
            user: {
                name: event.locals.user.name,
                email: event.locals.user.email,
                avatar: event.locals.user.avatar
            }
        }
    : {};
}*/