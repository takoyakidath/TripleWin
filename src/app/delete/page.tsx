"use client";
import React from "react";
import { Card } from "@/components/ui/card";
const DeleteLocalStorage = () => {
  const handleDelete = () => {
    localStorage.removeItem("user_uuid");
    console.log("Local storage cleared.");
    alert("ローカルストレージが削除されました。");
  };

  return (
    <div>
      <Card>
        {" "}
        <h1>ローカルストレージ削除</h1>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button onClick={handleDelete}>ローカルストレージを削除</button>
      </Card>
    </div>
  );
};

export default DeleteLocalStorage;
