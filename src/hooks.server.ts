import { SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from '$lib/constants';
import { prisma } from '$lib/prisma';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const now = new Date();
	const response = await resolve(event);

	const sessionId = event.cookies.get(SESSION_COOKIE_NAME);
	if (!sessionId) {
		event.locals.auth = null;
		return response;
	}

	const session = await prisma.session.findFirst({
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
	if (!session || session.expiresAt.valueOf() > Date.now()) {
		event.locals.auth = null;
		return response;
	}

	const expiresAt = new Date();
	expiresAt.setDate(now.getDate() + 30);
	await prisma.session.update({
		where: {
			id: sessionId
		},
		data: {
			expiresAt
		}
	});
	event.locals.auth = {
		session: { id: sessionId, expiresAt },
		user: session.user
	};
	event.cookies.set(SESSION_COOKIE_NAME, sessionId, {
		...SESSION_COOKIE_OPTIONS,
		expires: expiresAt
	});

	return response;
};
