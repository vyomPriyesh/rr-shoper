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

        allOptions: {
            get: 'all-options',
        },

        tickets: {
            getTicketForm: (id) => `ticket-form/by-ticket-title/${id}`,
            add: (id) => `ticket-form/${id}`,
        }
    }
}

export default apiList;