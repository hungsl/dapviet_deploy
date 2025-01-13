"use client";
import React, { createContext, useContext, useState } from "react";

interface PopupContextType {
  content:
    | "cart"
    | "checkout"
    | "register"
    | "login"
    | "transfer"
    | "payment"
    | "success"
    | "fail"
    | "qrpage"
    | "changepassword"
    | "createproduct"
    | "updateproduct"
    | "createcollection"
    | "createcategory"
    | "createsize"
    | "updateorderaddress";
  setContent: (
    content:
      | "cart"
      | "checkout"
      | "register"
      | "login"
      | "transfer"
      | "payment"
      | "success"
      | "fail"
      | "qrpage"
      | "changepassword"
      | "createproduct"
      | "updateproduct"
      | "createcollection"
      | "createcategory"
      | "createcategory"
      | "createsize"
      | "updateorderaddress"
  ) => void;
  openPopup: () => void;
  updateValue?: string | undefined;
  setUpdateValue: (updateValue: string | undefined) => void;
  closePopup: () => void;
  method: string | undefined;
  setMethod: (method: string) => void;
  isOpen: boolean;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<
    | "cart"
    | "checkout"
    | "register"
    | "login"
    | "transfer"
    | "payment"
    | "success"
    | "fail"
    | "qrpage"
    | "changepassword"
    | "createproduct"
    | "updateproduct"
    | "createcollection"
    | "createcategory"
    | "createsize"
    | "updateorderaddress"
  >("cart");
  const [isOpen, setIsOpen] = useState(false);
  const [method, setMethod] = useState<string>();
  const [updateValue, setUpdateValue] = useState<string>();
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <PopupContext.Provider
      value={{
        content,
        setContent,
        openPopup,
        closePopup,
        isOpen,
        updateValue,
        setUpdateValue,
        method,
        setMethod,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used within a PopupProvider");
  return context;
};
