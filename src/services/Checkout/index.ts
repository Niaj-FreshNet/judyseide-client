import envConfig from "@/src/config/envConfig";
import Cookies from "js-cookie";

import envConfig from "@/src/config/envConfig";
import Cookies from "js-cookie";

export const createCheckoutSession = async (requestData: any) => {
    const token = Cookies.get("accessToken"); // or whatever your token name is

    const token = Cookies.get("accessToken"); // or whatever your token name is

    try {
        const response = await fetch(`${envConfig.baseApi}/payment/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': ` ${token}` // ✅ Correct format
                'Accept': 'application/json',
                'Authorization': ` ${token}` // ✅ Correct format
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            const errorData = await parseResponse(response);
            console.error('API Error Response:', errorData);
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log('API Success Response:', result);
        return result;
        console.log('API Success Response:', result);
        return result;

    } catch (error) {
        console.error('API Request Failed:', error);
        throw error instanceof Error ? error : new Error('Network request failed');
    }
};

// Helper for response parsing
async function parseResponse(response: Response) {
    const contentType = response.headers.get('content-type');

    try {
        if (contentType?.includes('application/json')) {
            return await response.json();
        } else if (contentType?.includes('text/')) {
            const text = await response.text();
            return { message: text };
        } else {
            return {
                status: response.status,
                statusText: response.statusText,
                message: 'Unknown error occurred'
            };
        }
    } catch (parseError) {
        return {
            status: response.status,
            statusText: response.statusText,
            message: 'Could not parse error details'
        };
    }
}
