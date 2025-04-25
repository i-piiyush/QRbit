import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { GrLinkNext } from 'react-icons/gr';
import { FiUploadCloud } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { AppContext } from '../context/AppProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stepVariants = {
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
};

const AddInfo = () => {
  const { register, handleSubmit } = useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const inputClass =
    'w-full bg-black text-white py-2 px-6 rounded-md placeholder:text-gray-500 border border-green-600 focus:outline-none focus:bg-black focus:border-green-600';

  const formatCount = (value) => {
    const num = parseInt(value);
    if (isNaN(num)) return value;
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
  };

  const onNext = (data) => {
    const invalidName = /\d|[^a-zA-Z\s]/.test(data.name || '');
    const invalidProfession = /\d|[^a-zA-Z\s]/.test(data.profession || '');
    const invalidLocation = /\d|[^a-zA-Z\s,]/.test(data.location || '');

    if (step === 1 && invalidName) {
      toast.error('Name should not contain numbers or symbols');
      return;
    }
    if (step === 2 && invalidProfession) {
      toast.error('Profession should not contain numbers or symbols');
      return;
    }
    if (step === 4 && invalidLocation) {
      toast.error('Location should not contain numbers or symbols');
      return;
    }

    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const onSubmit = async (data) => {
    if (!formData.imageUrl) {
      toast.error('Please upload an image.');
      return;
    }

    try {
      const finalData = {
        ...formData,
        ...data,
        image: formData.imageUrl,
        followers: formatCount(data.followers),
        following: formatCount(data.following),
        likes: formatCount(data.likes),
        createdAt: new Date(),
      };

      delete finalData.imageUrl;

      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, finalData);

      toast.success('User data submitted!');
      navigate('/user-cards');
    } catch (error) {
      toast.error('Submission failed. Try again.');
      console.error('Submission error:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading("Please wait while the image uploads...", {
      autoClose: false,
    });

    const formDataCloud = new FormData();
    formDataCloud.append('file', file);
    formDataCloud.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formDataCloud,
        }
      );
      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
        toast.dismiss(toastId);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error(data.error.message);
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Image upload failed. Please try again.");
      console.error("Upload error:", err);
    }
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label className="block mb-2 font-semibold text-white">Your Name</label>
            <input {...register('name', { required: true })} className={inputClass} placeholder="Enter your name" />
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block mb-2 font-semibold text-white">Your Profession</label>
            <input {...register('profession', { required: true })} className={inputClass} placeholder="e.g., Software Developer" />
          </div>
        );
      case 3:
        return (
          <div>
            <label className="block mb-2 font-semibold text-white">About Yourself</label>
            <textarea {...register('about', { required: true, maxLength: 60 })} className={inputClass} placeholder="Tell something about yourself (max 60 words)" />
          </div>
        );
      case 4:
        return (
          <div>
            <label className="block mb-2 font-semibold text-white">Where do you live</label>
            <textarea {...register('location', { required: true })} className={inputClass} placeholder="Delhi, India" />
          </div>
        );
      case 5:
        return (
          <div>
            <label className="block mb-2 font-semibold text-white">Number of Followers</label>
            <input type="number" {...register('followers', { required: true })} className={inputClass} placeholder="e.g., 12000" />
          </div>
        );
      case 6:
        return (
          <div>
            <label className="block mb-2 font-semibold text-white">Following Count</label>
            <input type="number" {...register('following', { required: true })} className={inputClass} placeholder="e.g., 350" />
          </div>
        );
      case 7:
        return (
          <div>
            <label className="block mb-2 font-semibold text-white">Average Likes</label>
            <input type="number" {...register('likes', { required: true })} className={inputClass} placeholder="e.g., 600" />
            <label className="block mt-4 mb-2 font-semibold text-white">Contact Link</label>
            <input type="url" {...register('contact', { required: true })} className={inputClass} placeholder="https://yourlink.com" />
          </div>
        );
      case 8:
        return (
          <div>
            <label className="block mb-2 font-semibold text-white">Upload Your Image</label>
            <div className="border-2 border-dashed border-green-600 rounded-lg w-full h-40 flex items-center justify-center text-white relative">
              <FiUploadCloud className="text-4xl text-green-600" />
              <input
                type="file"
                accept="image/*"
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative">
      <div className="w-full max-w-md mb-4">
        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-2 bg-green-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 8) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="text-sm text-center text-gray-400 mt-1">Step {step} of 8</div>
      </div>

      <form
        onSubmit={step === 8 ? handleSubmit(onSubmit) : handleSubmit(onNext)}
        className="bg-black shadow-md rounded-xl p-8 w-full max-w-md overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            {getStepContent()}
          </motion.div>
        </AnimatePresence>

        <div className="w-full flex justify-center mt-6">
          <button type="submit" className="bg-green-600 text-white py-2 px-6 rounded-full flex gap-5 items-center">
            {step === 8 ? 'Submit' : 'Next'} <GrLinkNext />
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastClassName="custom-toast"
        className="custom-toast-container"
      />
    </div>
  );
};

export default AddInfo;
