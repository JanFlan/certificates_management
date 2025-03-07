import { Container, TextField, Typography } from "@mui/material";
import { CertificateContentProps } from "./CertificateContent.types";

const CertificateContent = ({ formData, onChange }: CertificateContentProps) => {
  return (
    <Container>
      <Typography variant="h6">Enter Certificate Content</Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        label="Certificate HTML Content"
        value={formData.certificateContent}
        onChange={(e) => onChange({
          certificateContent: e.target.value,
        })}
        margin="normal"
      />
    </Container>
  );
}
export default CertificateContent;