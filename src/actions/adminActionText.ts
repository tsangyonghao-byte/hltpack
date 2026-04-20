"use server";

import { cookies } from "next/headers";

export async function getAdminActionText() {
  const cookieStore = await cookies();
  const isZh = cookieStore.get("ADMIN_LOCALE")?.value === "zh";

  return {
    requiredImage: isZh
      ? "缺少必填项，请填写完整信息，并提供图片链接或上传图片。"
      : "Missing required fields. Please provide an image URL or upload a file.",
    imageRequired: isZh ? "请提供图片链接或上传图片。" : "Please provide an image URL or upload an image.",
    imageUrlInvalid: isZh ? "图片链接格式无效。" : "Image URL format is invalid.",
    productNameRequired: isZh ? "产品名称不能为空。" : "Product name is required.",
    productCategoryRequired: isZh ? "请选择产品分类。" : "Please select a product category.",
    productFeaturesRequired: isZh ? "请至少填写一个产品特点。" : "Please provide at least one product feature.",
    deleteProductFailed: isZh ? "删除产品失败" : "Failed to delete product",
    deleteProductsFailed: isZh ? "批量删除产品失败" : "Failed to delete selected products",
    createProductFailed: isZh ? "创建产品失败" : "Failed to create product",
    updateProductFailed: isZh ? "更新产品失败" : "Failed to update product",
    deleteNewsFailed: isZh ? "删除新闻失败" : "Failed to delete news",
    deleteNewsItemsFailed: isZh ? "批量删除新闻失败" : "Failed to delete selected news items",
    newsTitleRequired: isZh ? "新闻标题不能为空。" : "News title is required.",
    newsCategoryRequired: isZh ? "新闻分类不能为空。" : "News category is required.",
    newsDateRequired: isZh ? "显示日期不能为空。" : "Display date is required.",
    newsSummaryRequired: isZh ? "摘要不能为空。" : "Summary is required.",
    createNewsFailed: isZh ? "创建新闻失败" : "Failed to create news",
    updateNewsFailed: isZh ? "更新新闻失败" : "Failed to update news",
    categoryNameRequired: isZh ? "分类名称不能为空" : "Category name is required",
    deleteCategoryFailed: isZh
      ? "无法删除该分类，可能仍有关联产品"
      : "Cannot delete category with associated products",
    deleteCategoriesFailed: isZh ? "批量删除分类失败" : "Failed to delete selected categories",
    createCategoryFailed: isZh
      ? "创建分类失败，名称可能已存在"
      : "Failed to create category. Name might already exist.",
    updateCategoryFailed: isZh ? "更新分类失败" : "Failed to update category",
    bannerTitleRequired: isZh ? "轮播图标题不能为空。" : "Banner title is required.",
    bannerOrderInvalid: isZh ? "排序值必须是大于等于 0 的数字。" : "Display order must be a number greater than or equal to 0.",
    bannerLinkInvalid: isZh ? "按钮跳转链接格式无效。" : "Call to action link format is invalid.",
    bannerTitleImageRequired: isZh ? "标题和图片不能为空" : "Title and Image are required",
    deleteBannerFailed: isZh ? "删除轮播图失败" : "Failed to delete banner",
    updateBannersStatusFailed: isZh ? "批量更新轮播图状态失败" : "Failed to update selected banners",
    createBannerFailed: isZh ? "创建轮播图失败" : "Failed to create banner",
    updateBannerFailed: isZh ? "更新轮播图失败" : "Failed to update banner",
    deleteMessageFailed: isZh ? "删除留言失败" : "Failed to delete message",
    deleteMessagesFailed: isZh ? "批量删除留言失败" : "Failed to delete selected messages",
    updateMessageStatusFailed: isZh ? "更新留言状态失败" : "Failed to update status",
    updateMessagesStatusFailed: isZh ? "批量更新留言状态失败" : "Failed to update selected messages",
    invalidMessageStatus: isZh ? "留言状态无效" : "Invalid message status",
    updateMessageNoteFailed: isZh ? "更新留言备注失败" : "Failed to update message note",
    updateMessageOwnerFailed: isZh ? "更新负责人或跟进时间失败" : "Failed to update owner or follow-up time",
    updateMessagesOwnerFailed: isZh ? "批量更新负责人失败" : "Failed to update selected owners",
    updateMessagesFollowUpFailed: isZh ? "批量更新跟进时间失败" : "Failed to update selected follow-up times",
  };
}
