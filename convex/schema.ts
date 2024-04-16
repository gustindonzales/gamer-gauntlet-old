import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  games: defineTable({
    name: v.string(),
    releaseTime: v.number(),
  }),
  platforms: defineTable({
    name: v.string(),
  }),
  gamePlatforms: defineTable({
    gameId: v.id('games'),
    platformId: v.id('platforms'),
  }),
  tournamentTypes: defineTable({
    name: v.string(),
    description: v.string(),
  }),
  tournaments: defineTable({
    ownerId: v.id('users'),
    name: v.string(),
    description: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    entryFee: v.optional(v.number()),
    entryFeeCurrency: v.optional(v.string()),
    typeId: v.id('tournamentTypes'),
    maxPlayers: v.number(),
  }),
  users: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    preferredPlatformId: v.optional(v.id('platforms')),
  }).index('by_token', ['tokenIdentifier']),
});
