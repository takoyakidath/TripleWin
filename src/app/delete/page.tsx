"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const DeleteLocalStorage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleDelete = async () => {
      const userId = localStorage.getItem("user_uuid"); // Get the user ID from local storage
      if (userId) {
        const response = await fetch('/api/deleteuser', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }), // Send the user ID in the request body
        });

        if (response.ok) {
          localStorage.removeItem("user_uuid");
          console.log("User deleted and local storage cleared.");
          alert("ユーザーが削除され、ローカルストレージがクリアされました。");
          router.push("/");
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } else {
        alert("No user ID found in local storage.");
      }
    };

    handleDelete();
  }, [router]);

  return (
    <div>
        {/* handleDeleteはuseEffectで実行されるため、ここでは削除 */}
    </div>
  );
};

export default DeleteLocalStorage;
