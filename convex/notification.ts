import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getNotifications = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("token"), token))
      .order("desc")
      .take(10);
  },
});
export const deleteTask  = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
export const markNotificationAsRead = mutation({
    args: {id: v.id('tasks')},
    handler: async (ctx, args) => {
        const {id} = args;
        await ctx.db.patch(id, {isRead: true});
    }
})
export const deleteAllUnreadNotifications = mutation({
    args: {},
    handler: async (ctx) => {
      const unreadNotifications = await ctx.db
        .query("tasks")
        .filter((q) => q.eq(q.field("isRead"), false))
        .order("desc")
        .collect();
  
      if (unreadNotifications.length > 0) {
        for (const notification of unreadNotifications) {
          await ctx.db.delete(notification._id);
        }
      }
    },
  });
export const markAllNotificationAsRead = mutation({
  args: {},
  handler: async (ctx) => {
    const unreadNotifications = await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("isRead"), false))
      .order("desc")
      .collect();

    if (unreadNotifications.length > 0) {
      for (const notification of unreadNotifications) {
        await ctx.db.patch(notification._id, { isRead: true });
      }
    }
  },
});
export const createNotification = mutation({
  args: { text: v.string() , token: v.string()},
  handler: async (ctx, args) => {
    await ctx.db.insert("tasks", {
      text: args.text,
      isRead: false,
      token: args.token
    });
  },
});
