import http from "@/lib/http";
import { districtResType, provinceResType } from "@/schemaValidations/viettel";

const viettelApiRequest = {
    provinces : () => http.get<provinceResType>('viettel/provinces'),
    districts : (id : number | undefined ) => http.get<districtResType>(`viettel/districts?id=${id}`),
}
export default viettelApiRequest