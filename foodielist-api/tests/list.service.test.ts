import { ListService } from '../src/services/list.service';
import * as Repo from '../src/repositories/list.repo';

jest.mock('../src/repositories/list.repo', ()=> ({
  ListRepo: {
    all: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockImplementation(({nameRaw,nameNorm})=> Promise.resolve({ id:1, nameRaw, nameNorm, checked:false, createdAt: new Date().toISOString() })),
    update: jest.fn().mockResolvedValue({ id:1, nameRaw:'milk', nameNorm:'milk', checked:false, createdAt: new Date().toISOString() }),
    delete: jest.fn().mockResolvedValue({})
  }
}));

describe('ListService', () => {
  it('normalizes on add', async () => {
    const res = await ListService.add('Parmigiano Reggiano');
    expect(res.nameNorm).toBe('parmesan');
  });
  it('patch can set checked', async () => {
    const res = await ListService.patch(1, { checked: true });
    expect(Repo.ListRepo.update).toHaveBeenCalledWith(1, { checked: true });
  });
});
