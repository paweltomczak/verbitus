import Image from 'next/image';
import { useState } from 'react';

export default function ImageUload({
  fileInputRef,
  imageUrl,
  imageSelected,
  setImageSelected,
}: {
  fileInputRef: React.RefObject<HTMLInputElement>;
  imageUrl?: string;
  imageSelected: boolean;
  setImageSelected: (imageSelected: boolean) => void;
}) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
      setImageSelected(true);
    } else {
      setImagePreviewUrl('');
      setImageSelected(true);
    }
  };

  const imageSrc = imageSelected ? imagePreviewUrl : imageUrl;

  return (
    <div className='flex items-center'>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt='Post image'
          width={64}
          height={64}
          className='rounded mr-4'
        />
      ) : null}
      <input
        type='file'
        id='file'
        name='image'
        ref={fileInputRef}
        className='hidden'
        onChange={handleFileChange}
      />
      <label
        htmlFor='file'
        className='cursor-pointer ml-0 inline-block bg-primary text-white font-medium py-2 px-4 rounded hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      >
        Upload File
      </label>
    </div>
  );
}
