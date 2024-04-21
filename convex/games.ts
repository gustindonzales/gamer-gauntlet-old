import { query } from './_generated/server';

export const get = query({
  args: {},
  handler: async (ctx) => {
    const games = await ctx.db.query('games').collect();
    return games.sort((a, b) => a.name.localeCompare(b.name));
  },
});
