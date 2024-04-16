import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    startDate: v.string(),
    entryFee: v.number(),
    entryFeeCurrency: v.string(),
    typeId: v.id('tournamentTypes'),
    maxPlayers: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError('Not authenticated');

    const users = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('tokenIdentifier'), identity.tokenIdentifier))
      .order('desc')
      .take(100);

    if (!users.length) throw new ConvexError('User not found');
    const user = users[0];

    const newTournamentId = await ctx.db.insert('tournaments', {
      ...args,
      ownerId: user._id,
    });

    return newTournamentId;
  },
});
