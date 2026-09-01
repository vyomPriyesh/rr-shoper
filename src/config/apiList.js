const apiList = () => {
    return {
        auth: {
            sendOtp: "send-otp",
            verifyOtp: "verify-otp",
            profile: "profile",
            updateProfile: 'profile/update',
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

        contactUs: {
            raiseInquiry: 'raise-inquiry'
        },

        tickets: {
            getTicketForm: (id) => `ticket-form/by-ticket-title/${id}`,
            add: `ticket/add-ticket`,
            all: 'allTicket',
            view: (id) => `ticket/${id}`
        },

        payments: {
            requestPayment: 'payment/initiate',
            status: (id) => `payment/status/${id}`,
            customerOrders: '/payment/customer-orders',
            customerOrdersCounts: '/payment/customer-order-counts',
        },

        downGrade: {
            request: 'requestDowngrade/add-request'
        },
    }
}

export default apiList;