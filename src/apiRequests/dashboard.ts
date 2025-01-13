import http from "@/lib/http";
import { StatisticsResType } from "@/schemaValidations/dashboard.schema";

const dashboardApiRequest = {
    getDashboard : () => http.get<StatisticsResType>('/dashboard'),
}
export default dashboardApiRequest