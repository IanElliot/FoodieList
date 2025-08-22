import { ListRepo } from '@/repositories/list.repo';
import { normalize } from '@/utils/normalize';

export const ListService = {
  all: () => ListRepo.all(),
  add: (name: string) => ListRepo.create({ nameRaw: name, nameNorm: normalize(name) }),
  patch: (id: number, data: { checked?: boolean; name?: string }) => {
    const payload: any = {};
    if (typeof data.checked === 'boolean') payload.checked = data.checked;
    if (typeof data.name === 'string') { payload.nameRaw = data.name; payload.nameNorm = normalize(data.name); }
    return ListRepo.update(id, payload);
  },
  remove: (id: number) => ListRepo.delete(id)
};
