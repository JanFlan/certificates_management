import { Container, Typography } from "@mui/material";
import { LogoUploadProps } from "./LogoUpload.types";

const LogoUpload = ({ formData, onChange }: LogoUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.[0]) {
      const file = files[0];
      onChange({ logo: file });
    }
  };

  return (
    <Container>
      <Typography variant="h6">Upload Company Logo</Typography>
      <input type="file" onChange={handleFileChange} />
      {formData.logo && <Typography>{formData.logo.name}</Typography>}
    </Container>
  );
}

export default LogoUpload;