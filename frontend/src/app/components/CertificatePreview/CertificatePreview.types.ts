import { ReactNode } from "react";

export interface FormData {
  companyName: ReactNode;
  issueDate: ReactNode;
  logo: File | null; 
  certificateContent: string;
  formData: {
    certificateContent: string; 
    companyName: string;
    issueDate: string;
  };
}
