"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./header.module.css"; // Thay đổi đường dẫn tệp CSS của bạn
import Link from "next/link";
import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ButtonLogout from "@/components/buttonEffect/ButtonLogout";

const UserDropdown: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);// eslint-disable-line @typescript-eslint/no-unused-vars

  // Chỉ định rõ kiểu cho useRef
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Toggle hiển thị/ẩn dropdown
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  // Đóng dropdown khi người dùng nhấn ra ngoài
  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    // Thêm sự kiện khi nhấn ra ngoài
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Lưu URL trang gốc khi người dùng vào trang Profile
    sessionStorage.setItem("previousPage", window.location.href);
  }, []);

  return (
    <div className={styles.socialIcon} ref={wrapperRef}>
      <Popover>
        <PopoverTrigger>
          <User width={22} onClick={toggleDropdown} />
        </PopoverTrigger>
        <PopoverContent
          className="w-[150px] left-0 top-0 p-0"
          align="end"
          side="top"
        >
          <Link
            prefetch
            href="/customer/profile"
            className={`${styles.dropdownItem} hover:bg-accent`}
          >
            Thông tin người dùng
          </Link>

          <ButtonLogout />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserDropdown;
