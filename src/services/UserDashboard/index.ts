import envConfig from "@/src/config/envConfig";
import Cookies from "js-cookie";

// Function to fetch user profile
export const getProfile = async () => {
    const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${envConfig.baseApi}/user/profile`, {
     // or whatever your token name is
      method: "GET", // GET method to fetch profile
      headers: {
        "Content-Type": "application/json",
        'Authorization': ` ${token}` // ✅ Correct format
        // Add any necessary headers like authentication tokens
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch profile: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;  // Return null as fallback in case of an error
  }
};

// Function to update user profile
// export const updateProfile = async (body: any) => {
//     const token = Cookies.get("accessToken");
//   try {
//     const res = await fetch(`${envConfig.baseApi}/user/update-profile/`, {
//       method: "PATCH", // PATCH method to update profile
//       headers: {
//         "Content-Type": "application/json",
//         'Authorization': ` ${token}` // ✅ Correct format
//         // Add any necessary headers like authentication tokens
//       },
//       body: JSON.stringify(body), // Convert the body to a JSON string
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to update profile: ${res.statusText}`);
//     }

//     const data = await res.json();
//     return data;  // Return updated profile data
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return null;  // Return null or appropriate fallback value in case of an error
//   }
// };

// Function to update user profile
export const updateProfile = async (body: FormData) => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${envConfig.baseApi}/user/update-profile/`, {
      method: "PATCH",
      headers: {
        'Authorization': ` ${token}` // Remove Content-Type for FormData
      },
      body: body // Don't stringify FormData
    });

    if (!res.ok) {
      throw new Error(`Failed to update profile: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Throw error to handle in component
  }
};
