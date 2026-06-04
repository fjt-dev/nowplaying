'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function UrlInput() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!url.trim()) return;

    try {
      new URL(url);
    } catch {
      alert('有効なURLを入力してください');
      return;
    }
    router.push(`/share?url=${encodeURIComponent(url)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="flex gap-2 w-full">
      <Input
        type="url"
        placeholder="https://"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSubmit}>変換</Button>
    </div>
  );
}
