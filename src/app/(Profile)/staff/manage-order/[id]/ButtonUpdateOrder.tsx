"use client";
import { usePopup } from "@/app/context/popup-provider";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ButtonUpdateOrder({
  text,
}: {
  text: string;
}) {
  const {openPopup, setContent} = usePopup()
  const handleAction = async () => {
    setContent('updateorderaddress')
    openPopup()
  };
  return (
    <div className="flex justify-end">
      <Button onClick={handleAction}>{text}</Button>
    </div>
  );
}
