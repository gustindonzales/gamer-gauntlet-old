import { query } from './_generated/server';

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    return await ctx.db.query('tournamentTypes').collect();
  },
});
