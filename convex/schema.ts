import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  tournamentTypes: defineTable({
    name: v.string(),
    description: v.string(),
  }),
  tournaments: defineTable({
    name: v.string(),
    description: v.string(),
    typeId: v.id('tournamentTypes'),
    startDate: v.number(),
    endDate: v.number(),
  }),
  users: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
  }).index('by_token', ['tokenIdentifier']),
});
