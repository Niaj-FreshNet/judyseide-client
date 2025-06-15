"use client";

import { useRouter } from "next/navigation"; // Import useRouter for client-side navigation
import { useState } from "react";
import { logout as serverLogout } from "@/src/services/AuthService"; // Your logout hook

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
    } catch (error) {
      console.error("Error during logout", error);
    } finally {
      setIsLoggingOut(false); // Hide loading state
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut} // Disable the button while logging out
      className="text-red-500"
    >
      {isLoggingOut ? "Logging out..." : "Sign Out"}
    </button>
  );
};

export default LogoutButton;
