import React from 'react';
import { FestivalCardProps } from './types';
import { FestivalGrid } from './special-card-grid';

const festivalItems: FestivalCardProps[] = [
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ddb2876190e1a50a0f537174984a412a153f9508c9593c3407ba3c9efcc7394f?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e65b6dd7-f24e-49f2-baab-37c2e2651437?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    title: "Trang Phục Lễ Hội",
    description: "Bộ sưu tập đậm chất truyền \nthống cho các dịp lễ đặc biệt."
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d9d877d03f7d3d2cdc9c8b8f34e3a1a2f69cd625a6d5f079d40b33559dfee0c4?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/86e7704f-29bf-471e-9ab9-171a6ee0fcf8?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    title: "Trang Phục Lễ Hội",
    description: "Bộ sưu tập đậm chất truyền \nthống cho các dịp lễ đặc biệt."
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/16c35a25b2150419760827cb19b39e112d7a8475f64b057244cb11676d11a64e?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a8edb513-7687-49bb-9f9b-f39d579704b6?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    title: "Trang Phục Lễ Hội",
    description: "Bộ sưu tập đậm chất truyền \nthống cho các dịp lễ đặc biệt."
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c37f1d080ac9a4e79e302c6b9195718937464f6d592ed8aef41a2f9d99d0c057?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/bae6a301-802e-44e3-a6e8-38d3e909c8b5?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    title: "Trang Phục Lễ Hội",
    description: "Bộ sưu tập đậm chất truyền \nthống cho các dịp lễ đặc biệt."
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4866dffb4a4190095cf833f088fb8474b40965d1c44150783d51e99af4bcbe05?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e2384a98-b9b0-42fa-8787-0b2d838f08b8?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    title: "Trang Phục Lễ Hội",
    description: "Bộ sưu tập đậm chất truyền \nthống cho các dịp lễ đặc biệt."
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4866dffb4a4190095cf833f088fb8474b40965d1c44150783d51e99af4bcbe05?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e2384a98-b9b0-42fa-8787-0b2d838f08b8?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    title: "Trang Phục Lễ Hội",
    description: "Bộ sưu tập đậm chất truyền \nthống cho các dịp lễ đặc biệt."
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4866dffb4a4190095cf833f088fb8474b40965d1c44150783d51e99af4bcbe05?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e2384a98-b9b0-42fa-8787-0b2d838f08b8?placeholderIfAbsent=true&apiKey=d8eebe07670644148f4ae740e0f5d393",
    title: "Trang Phục Lễ Hội",
    description: "Bộ sưu tập đậm chất truyền \nthống cho các dịp lễ đặc biệt."
  }
];

export default function FestivalCollection(){
  return <FestivalGrid items={festivalItems} />;
};