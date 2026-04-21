import type { CookieSerializeOptions } from 'cookie';

export const SESSION_COOKIE_NAME = 'yw_session';
export const SESSION_COOKIE_OPTIONS: CookieSerializeOptions & { path: string } = {
	path: '/',
	httpOnly: true,
	secure: true,
	sameSite: 'lax'
};
