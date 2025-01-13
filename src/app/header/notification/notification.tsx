"use client";
import React, { useEffect, useState } from "react";
import styles from "./NotificationCard.module.css";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, CircleX } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timeAgo } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { PopoverPortal } from "@radix-ui/react-popover";
import accountApiRequest from "@/apiRequests/account";
// import { useAppContext } from "@/app/context/app-provider";
import { usePopup } from "@/app/context/popup-provider";
import { useRouter } from "next/navigation";
// import authApiRequest from "@/apiRequests/auth";
// import { useAppContext } from "@/app/context/app-provider";
// import LoadingAnimation from "@/components/common/LoadingAnimation";

export default function NotificationView() {
  // const { accessToken } = useAppContext();
  const { setContent, openPopup } = usePopup();
  const [userId, setUserId] = useState("");
  const router = useRouter();
  useEffect(() => {
    const CallUser = async () => {
      try {
        const result = await accountApiRequest.meClient();
        setUserId(result.payload.data.id);
        // console.log(result);
      } catch (error) {
        // setLoading(true)
        // await authApiRequest.logoutFromNextClientToNextServer();
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("refreshToken");
        // setIsLoggedIn(false);
        console.error("Error fetching user data:", error);
        // setLoading(false)
      }
    };
    CallUser();
  }, []);
  const handleOpencart = () => {
    setContent("cart");
    openPopup();
  };
  const handleOpenOrder = () => {
    router.push("/customer/order");
  };
  const notifications = useQuery(api.notification.getNotifications, {
    token: userId,
  });
  // const markAsRead = useMutation(api.notification.markNotificationAsRead);
  const deleteTask = useMutation(api.notification.deleteTask);
  // const markAllAsRead = useMutation(api.notification.markAllNotificationAsRead);
  const deleteAllUnreadNotifications = useMutation(
    api.notification.deleteAllUnreadNotifications
  );
  const hasNewNotification = !!notifications?.length;
 
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={styles.socialIconNotify}
          >
            <Bell width={32} />
            {hasNewNotification && (
              <div className={styles.notificationCount}>
                {notifications.length}
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent
            className={styles.popoverContent}
            align="end"
            side="top"
          >
            <div className={styles.notificationHeader}>
              <h3>Thông báo</h3>
            </div>
            <Separator />
            <ScrollArea>
              <div className={styles.notificationList}>
                {!hasNewNotification && <p>Bạn không có thông báo.</p>}
                {hasNewNotification &&
                  notifications
                    ?.slice(0, 10)
                    .map(({ _id, text, _creationTime }) => (
                      <div key={_id} className={`${styles.notificationItem} `}>
                        <div>
                          <p
                            onClick={() => {
                              if (text.includes("đã được thêm vào giỏ hàng")) {
                                handleOpencart();
                              } else {
                                handleOpenOrder();
                              }
                            }}
                            className={`${styles.notificationText} cursor-pointer`}
                          >
                            {text}
                          </p>
                          <p className={styles.notificationTime}>
                            {timeAgo(_creationTime)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => deleteTask({ id: _id })}
                          // onClick={() => markAsRead({ id: _id })}
                        >
                          <CircleX className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
              </div>
            </ScrollArea>
            {hasNewNotification && (
              <>
                <Separator />
                <div className="p-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => deleteAllUnreadNotifications()}
                  >
                    Xóa tất cả thông báo
                  </Button>
                </div>
              </>
            )}
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </>
  );
}
