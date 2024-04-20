import { v } from 'convex/values';
import { Doc } from './_generated/dataModel';
import { mutation, query } from './_generated/server';

/**
 * Insert or update the user in a Convex table then return the document's ID.
 *
 * The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
 * to look up identities.
 *
 * Keep in mind that `UserIdentity` has a number of optional fields, the
 * presence of which depends on the identity provider chosen. It's up to the
 * application developer to determine which ones are available and to decide
 * which of those need to be persisted. For Clerk the fields are determined
 * by the JWT token's Claims config.
 */

export const basicUserDetails = (user: Doc<'users'>) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export const getUser = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const getUserByTokenIdentifier = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), args.clerkId))
      .order('desc')
      .take(1);
    if (users.length === 0) {
      return null;
    }
    return users[0];
  },
});

export const storeUser = mutation({
  args: {
    clerkId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
  },
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Called storeUser without authentication present');
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) => q.eq('clerkId', identity.subject))
      .unique();

    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (
        user.firstName !== identity.givenName ||
        user.lastName !== identity.familyName ||
        user.email !== identity.email
      ) {
        await ctx.db.patch(user._id, {
          firstName: identity.givenName!,
          lastName: identity.familyName!,
          email: identity.email!,
        });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert('users', {
      firstName: identity.givenName!,
      lastName: identity.familyName!,
      email: identity.email!,
      clerkId: identity.subject,
    });
  },
});
