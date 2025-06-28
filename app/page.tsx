'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('sites').insert({ url });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('URL saved! ✅');
      setUrl('');
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Add a brand URL</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="border p-2 flex-grow"
          type="text"
          placeholder="https://brand.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2"
          type="submit"
        >
          Save
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
