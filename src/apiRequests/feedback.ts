import http from "@/lib/http";
import {
  DataStarResType,
  FeedbackProductResType,
  FeedbackResType,
} from "@/schemaValidations/feedback.schema";

const feedbackApiRequest = {
  giveFeedBack: (id: string, body: { content: string; rating: number }) =>
    http.post<FeedbackResType>(`orders/order-details/${id}/feedbacks`, body),
  getOrderFeedback: (id: string) =>
    http.get<FeedbackResType>(`orders/order-details/${id}/feedbacks`),
  getProductFeedback: (id: string, properties: string, direction: string, currentPage: number) =>
    http.get<FeedbackProductResType>(
      `products/${id}/feedbacks?page=${currentPage}&size=10&direction=${direction}&properties=${properties}`
    ),
  getSummaryFeedback: (id: string) =>
    http.get<DataStarResType>(
      `products/${id}/feedbacks/summary`
    ),
};
export default feedbackApiRequest;
