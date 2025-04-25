import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_upload'); // Make sure this matches your preset

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await axios.post(url, formData);

      console.log('✅ Uploaded Image URL:', res.data.secure_url);
      setImageUrl(res.data.secure_url);
    } catch (err) {
      console.error('❌ Upload failed:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Image to Cloudinary</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
