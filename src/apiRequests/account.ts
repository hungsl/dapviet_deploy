import http from "@/lib/http";
import {
  AccountResType,
  UpdateProfileInfoType,
  UsersListResType,
} from "@/schemaValidations/account.schema";

const accountApiRequest = {
  me: (accessToken: string) =>
    http.get<AccountResType>("users/current", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  meClient: () =>
    http.get<AccountResType>("users/current"),
  updateMe: (body: UpdateProfileInfoType) =>
    http.put<AccountResType>("users/current", body),
  updateImg: (body: { avatar: string }) =>
    http.put<AccountResType>("users/current/avatar", body),
  getUsersList: (
    search = "",
    page: number,
    size: number,
    direction = "",
    properties = ""
  ) =>
    http.get<UsersListResType>(
      `/users/staff?search=${search}&page=${page}&size=${size}&direction=${direction}&properties=${properties}`,
     
    ),
  userDetail: (id : string, accessToken: string) =>
    http.get<AccountResType>(`/users/${id}/staff`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  userDelete: (id : string) =>
    http.delete<AccountResType>(`/users/${id}/staff`,{}),
};
export default accountApiRequest;
