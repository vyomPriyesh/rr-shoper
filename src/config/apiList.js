const apiList = () => {
    return {
        auth: {
            sendOtp: "send-otp",
            verifyOtp: "verify-otp",
            profile: "profile",
            findCustomer: (email) => `findCustomer/${email}`,
        },

        images: {
            imgUrl: import.meta.env.VITE_IMAGES_URL,
            upload: 'images/upload',
        },

        platforms: {
            all: 'customer-all-platforms',
        },

        packages: {
            all: 'customer-all-packages',
        },
    }
}

export default apiList;