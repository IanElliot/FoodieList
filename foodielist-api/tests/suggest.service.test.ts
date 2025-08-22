import { computeCandidates } from '../src/services/suggest.service';

describe('computeCandidates', () => {
  it('ranks recipes by fewest missing and overlap', () => {
    const have = new Set(['pasta','butter','lemon']);
    const recipes = [
      { id:1, title:'Lemon Butter Pasta', imageUrl:null, sourceUrl:null, timeMin:20, ingredients:['pasta','butter','lemon','parmesan','basil'] },
      { id:2, title:'Tomato Basil Soup', imageUrl:null, sourceUrl:null, timeMin:30, ingredients:['tomato','onion','garlic','basil','cream'] }
    ];
    const out = computeCandidates(have, recipes);
    expect(out.length).toBe(1); // soup needs >3 missing, filtered out by default logic
    expect(out[0].id).toBe(1);
    expect(out[0].missing).toEqual(expect.arrayContaining(['parmesan','basil']));
  });
});
