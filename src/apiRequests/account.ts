import { StaffCheckAPIUserType } from "@/app/(Profile)/staff/manage-user/create-user/create-user";
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
  staffCreateUser: (body: StaffCheckAPIUserType) =>
    http.post<AccountResType>("/users/staff", body),
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
  userDetail: (id : string) =>
    http.get<AccountResType>(`/users/${id}/staff`),
  userDelete: (id : string) =>
    http.delete<AccountResType>(`/users/${id}/staff`,{}),
};
export default accountApiRequest;
