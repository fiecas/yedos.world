import { SESSION_COOKIE_NAME } from '$lib/constants';
import { prisma } from '$lib/prisma';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	const sessionId = event.cookies.get(SESSION_COOKIE_NAME);
	if (!sessionId) {
		event.locals.auth = null;
		return response;
	}

	const sessionWithUser = await prisma.session.findFirst({
		where: { id: sessionId },
		select: {
			id: true,
			expiresAt: true,
			user: {
				select: {
					id: true,
					profileUrl: true
				}
			}
		}
	});
	if (!sessionWithUser || sessionWithUser.expiresAt.valueOf() > Date.now().valueOf()) {
		event.locals.auth = null;
		return response;
	}

	const { user, ...session } = sessionWithUser;
	event.locals.auth = {
		session,
		user
	};

	return response;
};
