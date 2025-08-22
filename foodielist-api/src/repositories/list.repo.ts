import { prisma } from '@/lib/prisma';
export const ListRepo = {
  all: () => prisma.listItem.findMany({ orderBy: { createdAt: 'desc' } }),
  create: (data: { nameRaw: string; nameNorm: string }) => prisma.listItem.create({ data }),
  update: (id: number, data: Partial<{ nameRaw: string; nameNorm: string; checked: boolean }>) => prisma.listItem.update({ where: { id }, data }),
  delete: (id: number) => prisma.listItem.delete({ where: { id } })
};
