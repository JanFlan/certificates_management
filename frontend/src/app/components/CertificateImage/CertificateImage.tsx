import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import useStyles from './CertificateImage.styles';
import { CertificateImageProps } from './CertificateImage.types';

export default function CertificateImage({ certificateId, handleRestart }: CertificateImageProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const classes = useStyles(); // Use the styles

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/certificates/${certificateId}/image`, {
          responseType: 'blob',
        });
        const imageObjectUrl = URL.createObjectURL(response.data);
        setImageUrl(imageObjectUrl);
      } catch (err) {
        console.error(err);
        setError('Failed to load certificate image.');
      } finally {
        setLoading(false);
      }
    };
    if (certificateId) fetchImage();
  }, [certificateId]);

  if (loading) {
    return <CircularProgress size={32} color="inherit" />;
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  return (
    <Box className={classes.container}>
      <Image
        width={800}
        height={600}
        src={imageUrl}
        alt="Generated Certificate"
        className={classes.image}
      />
      {
        imageUrl && (
          <Button variant="contained" color="primary" onClick={handleRestart} className={classes.button}>
            Generate a new certificate
          </Button>
        )
      }
    </Box>
  );
}