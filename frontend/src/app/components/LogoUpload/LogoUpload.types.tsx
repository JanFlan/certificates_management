export interface LogoUploadProps {
  formData: { logo?: File };
  onChange: (data: { logo: File }) => void;
}
