export interface CompanyDetailsProps {
  formData: {
    companyName: string;
    issueDate: string;
  };
  onChange: (field: { [key: string]: string }) => void;
}

