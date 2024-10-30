// src/components/AddCardPopup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddCardPopup({ onClose, onCardAdded, onCardEdited, editingCard }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(editingCard ? editingCard.imageUrl : null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    if (editingCard) {
      setTitle(editingCard.title);
      setLink(editingCard.link);
      setExistingImage(editingCard.imageUrl);
      setImage(null);
      setRemoveImage(false);
    } else {
      setTitle('');
      setLink('');
      setImage(null);
      setExistingImage(null);
      setRemoveImage(false);
    }
  }, [editingCard]);

  const handleImageRemove = () => {
    setExistingImage(null);
    setRemoveImage(true); // Mark to remove image on submit
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('link', link);
    if (image) formData.append('image', image);
    if (removeImage) formData.append('removeImage', 'true');

    try {
      if (editingCard) {
        const response = await axios.put(`http://localhost:3456/cards/${editingCard.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        onCardEdited(response.data);
      } else {
        const response = await axios.post('http://localhost:3456/cards', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        onCardAdded(response.data);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="popup-overlay absolute w-full h-full bg-[#00000080]">
      <div className="popup-content bg-white p-4 rounded shadow-lg absolute w-[90%] max-w-[600px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h2 className="text-xl font-semibold mb-4">
          {editingCard ? 'Edit Card' : 'Add New Card'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          {existingImage && !removeImage ? (
            <div className="mb-4">
              <img
                src={`http://localhost:3456${existingImage}`}
                alt="Existing"
                className="w-24 h-24 mx-auto mb-2 rounded"
              />
              <button
                type="button"
                onClick={handleImageRemove}
                className="text-red-500 hover:text-red-700 underline"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 mb-4 border rounded"
            />
          )}

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-blue-500 px-4 text-xs font-medium tracking-wide text-white shadow-md shadow-blue-200 transition duration-300 hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-200 focus:bg-blue-700 focus:shadow-sm focus:shadow-blue-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
          >
            {editingCard ? 'Save Changes' : 'Add Card'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500 underline absolute top-[-12px] right-[6px]">
        <svg fill="#000000" viewBox="0 0 256 256" width="24" height="24"><path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"></path></svg>
        </button>
      </div>
    </div>
  );
}

export default AddCardPopup;
