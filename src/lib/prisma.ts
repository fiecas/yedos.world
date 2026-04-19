import { DATABASE_URL } from '$env/static/private';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({
	connectionString: DATABASE_URL
});

export const prisma = new PrismaClient({
	adapter
});
