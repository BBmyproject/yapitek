import { PROJECT_SLUGS, type ProjectSlug } from "./projects";

function hashSlug(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Mevcut projeyi hariç tutarak, slug’a bağlı deterministik “rastgele” iki proje.
 * (SSG’de sabit; her detay sayfasında farklı çiftler.)
 */
export function pickTwoOtherSlugs(
  current: ProjectSlug,
): readonly [ProjectSlug, ProjectSlug] {
  const others = PROJECT_SLUGS.filter((s) => s !== current);
  if (others.length === 0) {
    return [current, current];
  }
  if (others.length === 1) {
    const only = others[0]!;
    return [only, only];
  }

  let seed = hashSlug(current);
  const roll = () => {
    seed = (seed * 1103515245 + 12345) >>> 0;
    return seed % others.length;
  };

  let i0 = roll();
  let i1 = roll();
  let guard = 0;
  while (i1 === i0 && guard < others.length) {
    i1 = (i1 + 1) % others.length;
    guard += 1;
  }

  return [others[i0]!, others[i1]!];
}
