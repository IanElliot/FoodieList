const SYNONYMS: Record<string, string> = {
  parm: "parmesan",
  parmesan: "parmesan",
  "parmigiano reggiano": "parmesan",
  scallion: "green onion",
  scallions: "green onion",
  "green onions": "green onion",
  cilantro: "coriander",
  bellpepper: "bell pepper",
  bellpeppers: "bell pepper"
};
export function normalize(raw: string): string {
  const s = raw.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  if (SYNONYMS[s]) return SYNONYMS[s];
  const noBrand = s.replace(/^rao s\s+|^kerrygold\s+/, "");
  return SYNONYMS[noBrand] ?? noBrand;
}
