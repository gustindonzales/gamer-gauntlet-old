import { v } from 'convex/values';
import { query } from './_generated/server';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('platforms').collect();
  },
});

export const getPlatformsByGameId = query({
  args: { gameId: v.id('games') },
  handler: async (ctx, args) => {
    const gamePlatforms = await ctx.db
      .query('gamePlatforms')
      .filter((q) => q.eq(q.field('gameId'), args.gameId))
      .collect();
    const promises = [];
    for (const gamePlatform of gamePlatforms) {
      promises.push(ctx.db.get(gamePlatform.platformId));
    }
    return Promise.all(promises);
  },
});
