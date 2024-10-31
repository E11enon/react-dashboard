import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import Header from './Header';
import Footer from './Footer';
import Card from './Card';
import AddCardPopup from './AddCardPopup';

function AdminDashboard() {
  const [cards, setCards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3456/cards').then((response) => setCards(response.data));
  }, []);

  const handleCardAdded = (newCard) => {
    setCards([...cards, newCard]);
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await axios.delete(`http://localhost:3456/cards/${cardId}`);
      setCards(cards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowPopup(true);
  };

  const handleSaveEdit = (updatedCard) => {
    setCards(
      cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    setEditingCard(null);
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Header />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 w-full max-w-screen-lg">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            link={card.link}
            image={card.imageUrl}
            onDelete={() => handleDeleteCard(card.id)}
            onEdit={() => handleEditCard(card)}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setEditingCard(null);
          setShowPopup(true);
        }}
        className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none m-6"
      >
        Add Card
      </button>

      <Footer />

      {showPopup && (
        <AddCardPopup
          onClose={() => setShowPopup(false)}
          onCardAdded={handleCardAdded}
          onCardEdited={handleSaveEdit}
          editingCard={editingCard}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
