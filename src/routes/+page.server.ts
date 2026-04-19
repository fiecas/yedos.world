import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await prisma.post.findMany({ select: { title: true, slug: true } });

	return { posts };
};
