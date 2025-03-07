"use client";
import { useState } from 'react';
import axios from 'axios';
import { Container, Stepper, Step, StepLabel, Button, Box, ThemeProvider, createTheme, CircularProgress, Typography } from '@mui/material';
import CompanyDetails from './components/CompanyDetails/CompanyDetails';
import LogoUpload from './components/LogoUpload/LogoUpload';
import CertificateContent from './components/CertificateContent/CertificateContent';
import CertificatePreview from './components/CertificatePreview/CertificatePreview';
import CertificateImage from './components/CertificateImage/CertificateImage';

const steps = ['Company Details', 'Upload Logo', 'Certificate Content', 'Preview & Submit'];


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function CertificateForm() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    issueDate: '',
    logo: null,
    certificateContent: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleNext = async () => {
    if (validateStep()) {
      setError('');
      if (activeStep === steps.length - 1) {
        await submitForm();
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setError('');
    setActiveStep((prev) => prev - 1)
  };
  const handleChange = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
  };

  const handleRestart = () => {
    setActiveStep(0);
    setCertificateId(null);
    setFormData({
      companyName: '',
      issueDate: '',
      logo: null,
      certificateContent: '',
    });
    setError('');
  };

  const validateStep = () => {
    if (activeStep === 0 && (!formData.companyName || !formData.issueDate)) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (activeStep === 1 && !formData.logo) {
      setError('Please upload a logo.');
      return false;
    }
    if (activeStep === 2 && !formData.certificateContent) {
      setError('Certificate content cannot be empty.');
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    const formDataObj = new FormData();
    formDataObj.append('companyName', formData.companyName);
    formDataObj.append('issueDate', formData.issueDate);
    if (formData.logo) {
      formDataObj.append('logo', formData.logo);
    }
    formDataObj.append('certificateContent', formData.certificateContent);
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/certificates', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setCertificateId(response.data.id);
    } catch (error) {
      console.error('Error generating certificate:', error);
      setError('Failed to generate certificate.');
    }
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2, boxShadow: 2 }}>
          {activeStep === 0 && <CompanyDetails formData={formData} onChange={handleChange} />}
          {activeStep === 1 && <LogoUpload formData={formData} onChange={handleChange} />}
          {activeStep === 2 && <CertificateContent formData={formData} onChange={handleChange} />}
          {activeStep === 3 && <CertificatePreview formData={formData} />}
          {certificateId && <CertificateImage certificateId={certificateId} handleRestart={handleRestart} />}
        </Box>
        {
          !certificateId &&
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            {activeStep > 0 && <Button onClick={handleBack} variant="outlined" disabled={isLoading}>Back</Button>}
            {activeStep < steps.length - 1 ? (
              <Button onClick={handleNext} variant="contained">Next</Button>
            ) : (
              <Button onClick={handleNext} variant="contained" color="primary" style={{ display: 'flex', gap: 8 }} disabled={isLoading}>
                {
                  isLoading ?
                    <CircularProgress size={24} color="inherit" />
                    : null
                }
                Submit
              </Button>
            )}
          </Box>
        }
        <Typography color="error" align="right" marginTop={1}>{error}</Typography>
      </Container>
    </ThemeProvider>
  );
}
