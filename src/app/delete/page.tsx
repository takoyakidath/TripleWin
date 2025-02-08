"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

const DeleteLocalStorage = () => {
  const router = useRouter();

  const handleDelete = () => {
    localStorage.removeItem("user_uuid");
    console.log("Local storage cleared.");
    alert("ローカルストレージが削除されました。");
    router.push("/");
  };

  useEffect(() => {
    handleDelete();
  }, []);

  return (
    <div>
        {/* handleDeleteはuseEffectで実行されるため、ここでは削除 */}
    </div>
  );
};

export default DeleteLocalStorage;
