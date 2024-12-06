'use client';

import { useEffect } from 'react';

export default function ImageLoader() {
  useEffect(() => {
    const images = document.querySelectorAll('img.loading');
    
    const loadImage = (image: HTMLImageElement) => {
      if (image.complete) {
        image.classList.remove('loading');
        image.classList.add('loaded');
      } else {
        image.onload = () => {
          image.classList.remove('loading');
          image.classList.add('loaded');
        };
      }
    };

    images.forEach(img => {
      if (img instanceof HTMLImageElement) {
        loadImage(img);
      }
    });

    // Intersection Observer를 사용하여 뷰포트에 들어오는 이미지만 로드
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target instanceof HTMLImageElement) {
          loadImage(entry.target);
          imageObserver.unobserve(entry.target);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    return () => {
      imageObserver.disconnect();
    };
  }, []);

  return null;
}
