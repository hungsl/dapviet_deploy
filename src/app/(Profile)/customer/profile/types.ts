import { UpdateProfileInfoType } from "@/schemaValidations/account.schema";

export interface data {
  id: string; // id là kiểu string (UUID)
  name: string;
  dob: string; // dob là kiểu string để phù hợp với định dạng ngày tháng ISO 8601
  gender: "OTHER" | "MALE" | "FEMALE"; // Giả sử giới tính chỉ có những giá trị này
  email: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  avatar: string;
  role: string;
  status: string;
  createdBy: string;
  createdDate: string; 
  updatedBy: string;
  updatedDate: string; 
}


export interface dataInfo {
  id: string; 
  name: string;
  dob: string; 
  gender: "OTHER" | "MALE" | "FEMALE"; 
  email: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  avatar: string;
  role: string; 
}

export interface ProfileHeaderProps {
  userData: data;
}

export interface ProfileFormProps {
  userData: dataInfo;
  onCancel?: () => void;
  onSave?: (value : UpdateProfileInfoType) => void;
}

export interface ProfileFieldProps {
  label: string;
  value: string;
}
