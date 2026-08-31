import { useMutation } from "@tanstack/react-query";
import api from "../config/api";
import apiList from "../config/apiList";
import { useToast } from "../context/ToastContext";

const handlePayment = ({ onSuccess } = {}) => {

    const { payments } = apiList();
    const { showToast } = useToast();

    const {
        mutate: requestPaymentHandle,
        isPending: requestPaymentPending,
    } = useMutation({
        mutationFn: (payload) =>
            api.post(
                payments.requestPayment,
                payload
            ),

        onSuccess: ({ data }) => {
            const redirectUrl =
                data?.data?.result?.redirectUrl;

            if (redirectUrl) {
                onSuccess?.();

                window.location.href = redirectUrl;

                return;
            }

            showToast(
                "Unable to start payment",
                "error"
            );
        },

        onError: ({ response }) => {
            showToast(
                response?.data?.error?.error_message ||
                "Unable to start payment",
                "error"
            );
        },
    });

    return {
        handlePayment: requestPaymentHandle,
        paymentPending: requestPaymentPending,
    };

};

export default handlePayment;
