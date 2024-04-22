import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { basicUserDetails } from './users';
import { Doc } from './_generated/dataModel';

export interface Tournament extends Doc<'tournaments'> {
  typeId: never;
  gameId: never;
  ownerId: never;

  game: Doc<'games'>;
  type: Doc<'tournamentTypes'>;
  owner: Doc<'users'>;
  platforms: Doc<'platforms'>[];
}

export const getTournamentDependencies = query({
  args: {},
  handler: async (ctx) => {
    const results = await Promise.all([
      ctx.db.query('tournamentTypes').collect(),
      ctx.db.query('tournamentFormats').collect(),
      ctx.db.query('tournamentStages').collect(),
      ctx.db.query('games').collect(),
      ctx.db.query('platforms').collect(),
    ]);
    return results;
  },
});

export const getById = query({
  args: { tournamentId: v.id('tournaments') },
  handler: async (ctx, args) => {
    const tournament = (await ctx.db.get(args.tournamentId)) as any;
    if (!tournament) throw new ConvexError('Tournament not found');
    const joins = await Promise.all([
      ctx.db.get(tournament.gameId),
      ctx.db.get(tournament.typeId),
      ctx.db.get(tournament.ownerId),
      ctx.db
        .query('tournamentPlatforms')
        .filter((q) => q.eq(q.field('tournamentId'), args.tournamentId))
        .collect(),
    ]);

    tournament.game = joins[0];
    tournament.type = joins[1];
    tournament.owner = basicUserDetails(joins[2] as Doc<'users'>);
    tournament.platforms = await Promise.all(
      joins[3].map((join) => ctx.db.get(join.platformId)),
    );

    delete tournament.gameId;
    delete tournament.typeId;
    delete tournament.ownerId;
    return tournament as Tournament;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    startDate: v.number(),
    entryFee: v.optional(v.number()),
    entryFeeCurrency: v.optional(v.string()),
    gameId: v.id('games'),
    platformIds: v.array(v.id('platforms')),
    typeId: v.id('tournamentTypes'),
    maxEntries: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError('Not authenticated');

    const users = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), identity.subject))
      .order('desc')
      .take(1);

    if (!users.length) throw new ConvexError('User not found');
    const user = users[0];

    const newTournamentId = await ctx.db.insert('tournaments', {
      name: args.name,
      description: args.description,
      startDate: args.startDate,
      entryFee: args.entryFee,
      entryFeeCurrency: args.entryFeeCurrency,
      gameId: args.gameId,
      typeId: args.typeId,
      maxEntries: args.maxEntries,
      ownerId: user._id,
    });

    const tournamentPlatformPromises = [];
    for (const platformId of args.platformIds) {
      tournamentPlatformPromises.push(
        ctx.db.insert('tournamentPlatforms', {
          tournamentId: newTournamentId,
          platformId: platformId,
        }),
      );
    }

    await Promise.all(tournamentPlatformPromises);

    return newTournamentId;
  },
});
