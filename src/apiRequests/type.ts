import http from "@/lib/http";
import { CartResType } from "@/schemaValidations/cart";
import {
  collectionListResType,
  CollectionResType,
  CreateCategoryBodyType,
  CreateCollectionSchemaType,
  TypeItemResType,
  TypesListResType,
} from "@/schemaValidations/type.schema";

const typesApiRequest = {
  typesList: (
    page: number = 1,
    size: number = 5,
    search: string = "",
    properties: string,
    direction: string
  ) =>
    http.get<TypesListResType>(
      `products/types/staff?search=${search}&page=${page}&size=${size}&direction=${direction}&properties=${properties}`
    ),
  collectionsList: () =>
    http.get<collectionListResType>(
      "products/collections/staff?page=1&size=100"
    ),
  sizesList: () => http.get<TypesListResType>("products/sizes/staff?size=100"),
  type: (id: string) =>
    http.get<TypeItemResType>(`/products/types/${id}/staff`),
  collection: (id: string) =>
    http.get<CollectionResType>(`/products/collections/${id}/staff`),
  size: (id: string) =>
    http.get<TypeItemResType>(`/products/sizes/${id}/staff`),
  createType: (value: CreateCategoryBodyType) =>
    http.post<TypeItemResType>("products/types/staff", value),
  createCollection: (value: CreateCollectionSchemaType) =>
    http.post<CollectionResType>("products/collections/staff", value),
  createSize: (value: CreateCategoryBodyType) =>
    http.post<TypeItemResType>("products/sizes/staff", value),
  updateType: (id: string, value: CreateCategoryBodyType) =>
    http.put<TypeItemResType>(`/products/types/${id}/staff`, value),
  updateCollection: (id: string, value: CreateCollectionSchemaType) =>
    http.put<CollectionResType>(`/products/collections/${id}/staff`, value),
  updateSize: (id: string, value: CreateCategoryBodyType) =>
    http.put<TypeItemResType>(`/products/sizes/${id}/staff`, value),
  deleteType: (id: string) =>
    http.delete<CartResType>(`/products/types/${id}/staff`, {}),
  deleteCollection: (id: string) =>
    http.delete<CartResType>(`/products/collections/${id}/staff`, {}),
  deleteSize: (id: string) =>
    http.delete<CartResType>(`/products/sizes/${id}/staff`, {}),
  activeSize: (id: string) =>
    http.put<CartResType>(`/products/sizes/${id}/reactive/staff`, {}),
  activeCollection: (id: string) =>
    http.put<CartResType>(`/products/collections/${id}/reactive/staff`, {}),
  activeType: (id: string) =>
    http.put<CartResType>(`/products/types/${id}/reactive/staff`, {}),
};
export default typesApiRequest;
