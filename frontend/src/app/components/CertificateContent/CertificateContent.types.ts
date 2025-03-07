export interface CertificateContentProps {
  formData: {
    certificateContent: string;
    companyName: string;
    issueDate: string;
  };
  onChange: (field: { [key: string]: string }) => void;
}

