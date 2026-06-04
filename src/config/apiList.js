const apiList = () => {
    return {
        auth: {
            sendOtp: "send-otp",
            verifyOtp: "verify-otp",
            profile: "profile"
        },

        images: {
            upload: 'images/upload'
        }
    }
}

export default apiList;