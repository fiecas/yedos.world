import { json } from '@sveltejs/kit';

export function GET() {
	return json({
		issuer: 'https://yedos.world',
		authorization_endpoint: 'https://yedos.world/indieauth/authorize',
		token_endpoint: 'https://yedos.world/indieauth/token',
		code_challenge_methods_supported: ['S256'],
		response_types_supported: ['code'],
		grant_types_supported: ['authorization_code'],
		scopes_supported: ['profile', 'email']
	});
}
