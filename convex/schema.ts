import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    isRead: v.boolean(),
    text: v.string(),
    token: v.string(),
  }),
});