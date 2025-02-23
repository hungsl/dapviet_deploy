import http from "@/lib/http";
import { CartResType } from "@/schemaValidations/cart";
import { collectionResType } from "@/schemaValidations/collection.schema";
import {
  CategoryListResType,
  ProductListResType,
  ProductResType,
  TopProductListResType,
  UpdateApiProductBodyType,
} from "@/schemaValidations/product.schema";
import {
  collectionListResType,
  CollectionResType,
  TypesListResType,
} from "@/schemaValidations/type.schema";

const productApiRequest = {
  collection: () =>
    http.get<collectionResType>(
      "/products/collections?page=1&size=100&direction=ASC"
    ),
  collectionItem: (id: string) =>
    http.get<CollectionResType>(`/products/collections/${id}`),
  category: () => http.get<CategoryListResType>("/products/types"),

  product: (id: string) => http.get<ProductResType>(`/products/${id}`),
  topProducts: () => http.get<TopProductListResType>(`/products/top?size=10`),
  feedbackView: (id: string) =>
    http.get<ProductResType>(`products/${id}/feedbacks`),

  products: (params: {
    sizes?: string[];
    types?: string[];
    collections?: string;
    page?: number;
    size?: number;
    minPrice?: number;
    maxPrice?: number;
    direction?: string;
    search?: string;
  }) =>
    http.get<ProductListResType>(
      `/products?` +
        `search=${params.search || ""}` +
        `&minPrice=${params.minPrice || ""}` +
        `&maxPrice=${params.maxPrice || ""}` +
        `${params.sizes?.map((size) => `&sizes=${size}`).join("") || ""}` +
        `${params.types?.map((type) => `&types=${type}`).join("") || ""}` +
        `&collections=${params.collections || ""}` +
        `&page=${params.page || ""}` +
        `&size=${params.size || ""}` +
        `&direction=${params.direction || ""}` +
        `&properties=unitPrice`
    ),
  productsStaff: (params: {
    search?: string;
    page?: number;
    size?: number;
    direction?: string;
    minPrice?: number;
    maxPrice?: number;
    properties?: string;
  }) =>
    http.get<ProductListResType>(
      `/products/staff?` +
        `search=${params.search || ""}` +
        `&minPrice=${params.minPrice || ""}` +
        `&maxPrice=${params.maxPrice || ""}` +
        `&page=${params.page || ""}` +
        `&size=${params.size || ""}` +
        `&direction=${params.direction || ""}` +
        `&properties=${params.properties || ""}`
    ),

  sizeProductsStaff: () => http.get<TypesListResType>("/products/sizes/staff"),
  typeProductsStaff: () => http.get<TypesListResType>("/products/types/staff"),
  collectionProductsStaff: () =>
    http.get<collectionListResType>("/products/collections/staff"),
  productStaff: (id: string) =>
    http.get<ProductResType>(`/products/${id}/staff`),
  updateProductStaff: (id: string, body: UpdateApiProductBodyType) =>
    http.put<ProductResType>(`/products/${id}/staff`, body),
  createProductStaff: (body: UpdateApiProductBodyType) =>
    http.post<ProductResType>(`/products/staff`, body),
  deleteProductStaff: (id: string) =>
    http.delete<CartResType>(`/products/${id}/staff`, {}),
  activeProductStaff: (id: string) =>
    http.put<CartResType>(`/products/${id}/reactive/staff`, {}),
};
export default productApiRequest;
