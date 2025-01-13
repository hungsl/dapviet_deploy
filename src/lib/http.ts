import envConfig from "@/config";
import { redirect } from "next/navigation";
import { normalizePath } from "./utils";

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EnttityErrorPayload = {
  data: undefined;
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    data: undefined;
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}
export class EntityError extends HttpError {
  status: 422 | 400; // Cập nhật để chấp nhận cả 422 và 404
  payload: EnttityErrorPayload;

  constructor({
    status,
    payload,
  }: {
    status: 422 | 400; // Cập nhật kiểu cho status
    payload: EnttityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

export const isClient = () => typeof window !== "undefined";
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }
  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };
  if (isClient()) {
    if (
      ["users/auth/access-token", "users/auth/access-token"].some(
        (item) => item === normalizePath(url)
      )
    ) {
      console.log("refresh");
    } else {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        baseHeaders.Authorization = `Bearer ${accessToken}`;
      }
    }
  }
  //nếu truyền vào là '' thì đồng nghĩa với việc gọi api đến nextjs server
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EnttityErrorPayload;
        }
      );
    }
    if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient()) {
        console.log("401 errror");
        try {
          await fetch("/api/authen/logout", {
            method: "POST",
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders,
            },
          });
        } catch (error) {
          console.log("Lỗi logout: ", error);
        } finally {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          location.href = "/login";
        }
      } else {
        const sessionToken = (options?.headers as any).Authorization.split(
          "Bearer "
        )[1];
        redirect(`/logout?sessionToken=${sessionToken}`);
      }
    } else {
      throw new HttpError(data);
    }
  }
  return data;
};
const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};
/* eslint-enable @typescript-eslint/no-explicit-any */
export default http;
