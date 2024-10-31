import React from 'react';

function Header() {
  return (
    <header className="bg-black text-white p-4 w-full flex justify-between items-center">
        <img
        src="http://localhost:3456/uploads/je-rl.png"
        alt="Logo"
        className="h-10 mr-4"
      />
      <h1 className="text-2xl font-bold">Internal Dashboard</h1>
    </header>
  );
}

export default Header;
