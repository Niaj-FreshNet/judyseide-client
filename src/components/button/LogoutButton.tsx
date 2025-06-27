"use client";

import { useRouter } from "next/navigation"; // Import useRouter for client-side navigation
import { useState } from "react";
import { logout as serverLogout } from "@/src/services/AuthService"; // Your logout hook
import { Button } from "@heroui/button";

const LogoutButton = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true); // Show loading state (optional)

      // Call your server-side logout function
      await serverLogout();

      // Redirect to login page after successful logout
      router.push("/login");

      window.location.reload();

    } catch (error) {
      console.error("Error during logout", error);
    } finally {
      setIsLoggingOut(false); // Hide loading state
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoggingOut} // Disable the button while logging out
      className="text-red-500 font-semibold rounded-none px-4 py-2 text-md bg-gray-200"
    >
      {isLoggingOut ? "Logging out..." : "Sign Out"}
    </Button>
  );
};

export default LogoutButton;
