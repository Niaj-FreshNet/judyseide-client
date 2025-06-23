export const createCheckoutSession = async (requestData: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        const result = await response.json();
        console.log('Response from createCheckoutSession:', result); // Log API response

        if (response.ok) {
            return result; // You can handle the result here (e.g., return session data)
        } else {
            throw new Error(result.message || 'Error creating checkout session');
        }
    } catch (error) {
        console.error('Error:', error); // Log errors if API fails
        throw error; // Rethrow error to handle in the calling component
    }
};
