import http from "@/lib/http";
import { FeedbackResType } from "@/schemaValidations/feedback.schema";

const feedbackApiRequest = {
    giveFeedBack : (id: string, body : {content: string, rating: number}) => http.post<FeedbackResType>(`orders/order-details/${id}/feedbacks`,body),
    getFeedback : (id: string, accessToken : string) => http.get<FeedbackResType>(`orders/order-details/${id}/feedbacks`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }),
}
export default feedbackApiRequest