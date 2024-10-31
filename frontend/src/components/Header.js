import React from 'react';

function Header() {
  return (
    <header className="bg-black text-white w-full flex justify-between items-center p-4">
        <a href="/"><img
        src="http://localhost:3456/uploads/je-rl.png"
        alt="Logo"
        className="h-10 mr-4"
      /></a>
      <h1 className="text-2xl font-bold">Internal Dashboard</h1>
      <a href="/admin" className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none">Admin</a>
    </header>
  );
}

export default Header;
