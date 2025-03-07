import { Container, Typography } from "@mui/material";
import { FormData } from "./CertificatePreview.types";

const CertificatePreview = ({ formData }: { formData: FormData }) => {
  return (
    <Container>
      <Typography variant="h6">Certificate Preview</Typography>
      <Typography variant="body1">Company Name: {formData.companyName}</Typography>
      <Typography variant="body1">Issue Date: {formData.issueDate}</Typography>
      {formData.logo && <Typography variant="body1">Logo: {formData.logo.name}</Typography>}
      <div dangerouslySetInnerHTML={{ __html: formData.certificateContent }} />
    </Container>
  );
}
export default CertificatePreview;