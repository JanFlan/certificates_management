import { Container, TextField, Typography, } from '@mui/material';
import { CompanyDetailsProps } from './CompanyDetails.types';

const CompanyDetails = ({ formData, onChange }: CompanyDetailsProps) => {
  return (
    <Container>
      <Typography variant="h6">Enter Company Details</Typography>
      <TextField
        required
        fullWidth
        label="Company Name"
        value={formData.companyName}
        onChange={(e) => onChange({ companyName: e.target.value })}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        label="Issue Date"
        type="date"
        value={formData.issueDate}
        onChange={(e) => onChange({ issueDate: e.target.value })}
        margin="normal"
        slotProps={{
          inputLabel: {
            shrink: true
          }
        }}
      />
    </Container>
  );
}

export default CompanyDetails;