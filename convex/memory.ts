import { mutation, query } from "./_generated/server";

// API lấy trạng thái từ database
export const getState = query({
  handler: async (ctx) => {
    const state = await ctx.db.query("clickState").first();
    return state || { clicked: false }; // Mặc định false nếu chưa có dữ liệu
  },
});

// API cập nhật trạng thái khi nhấn nút
export const triggerClick = mutation({
  handler: async (ctx) => {
    const state = await ctx.db.query("clickState").first();

    if (state) {
      // Nếu có dữ liệu, cập nhật trạng thái
      await ctx.db.patch(state._id, { clicked: !state.clicked });
    } else {
      // Nếu chưa có dữ liệu, tạo mới
      await ctx.db.insert("clickState", { clicked: true });
    }
  },
});
