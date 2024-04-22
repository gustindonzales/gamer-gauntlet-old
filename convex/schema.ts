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
  tournamentFormats: defineTable({
    name: v.string(),
    description: v.string(),
    code: v.string(),
  }),
  tournamentStages: defineTable({
    name: v.string(),
    description: v.string(),
    code: v.string(),
  }),
  tournaments: defineTable({
    ownerId: v.id('users'),
    name: v.string(),
    description: v.string(),
    startDate: v.number(),
    endDate: v.optional(v.number()),
    entryFee: v.optional(v.number()),
    entryFeeCurrency: v.optional(v.string()),
    gameId: v.id('games'),
    typeId: v.id('tournamentTypes'),
    maxEntries: v.number(),
  }),
  tournamentPlatforms: defineTable({
    tournamentId: v.id('tournaments'),
    platformId: v.id('platforms'),
  }),
  users: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    clerkId: v.string(),
    preferredPlatformId: v.optional(v.id('platforms')),
  }).index('by_token', ['clerkId']),
});
