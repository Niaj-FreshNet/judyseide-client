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


// Fetch all orders for a specific user
export const getUserOrders = async (id: string) => {
  const token = Cookies.get("accessToken");

  try {
    const res = await fetch(`${envConfig.baseApi}/order/get-user-orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ` ${token}`, // Add token for protected route
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user orders: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return null;
  }
};

// Fetch order details for a specific order ID
export const getUserOrderDetails = async (id: string) => {
  const token = Cookies.get("accessToken");

  try {
    const res = await fetch(`${envConfig.baseApi}/order/my-orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ` ${token}`, // Token is necessary
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch order details: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    return null;
  }
};


// Updated addReview API function (JSON version)
export const addReview = async (reviewData: {
  title: string;
  comment: string;
  rating: number;
  productId: string;
}) => {
  const token = Cookies.get("accessToken");

  try {
    const res = await fetch(`${envConfig.baseApi}/review/create-review`, {
      method: "POST",
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Failed to add review: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};
