import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const post = prisma.post.findUnique({
		where: {
			slug: params.slug
		}
	});

	return { post };
};
