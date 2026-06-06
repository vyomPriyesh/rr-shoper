const apiList = () => {
    return {
        auth: {
            sendOtp: "send-otp",
            verifyOtp: "verify-otp",
            profile: "profile",
        },

        images: {
            imgUrl:import.meta.env.VITE_IMAGES_URL,
            upload: 'images/upload',
        },

        platforms:{
            all:'customer-all-platforms',
        },
    }
}

export default apiList;