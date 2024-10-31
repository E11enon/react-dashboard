import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import Header from './Header';
import Footer from './Footer';
import Card from './Card';

function Dashboard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3456/cards').then((response) => setCards(response.data));
  }, []);

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
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
