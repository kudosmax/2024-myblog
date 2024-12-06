'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface MDImageProps {
  src: string;
  alt: string;
}

export default function MDImage({ src, alt }: MDImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 이미지가 변경될 때마다 로딩 상태 초기화
    setLoading(true);
    setError(false);
  }, [src]);

  return (
    <div className="img-container">
      <Image
        src={src}
        alt={alt}
        fill
        className={`transition-all duration-300 ${
          loading ? 'loading' : 'loaded'
        }`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        quality={75}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          이미지를 불러올 수 없습니다
        </div>
      )}
    </div>
  );
}
