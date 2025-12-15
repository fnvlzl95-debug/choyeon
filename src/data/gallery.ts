import type { GalleryItem, GalleryCategory } from '@/types';

// Real images from Unsplash for each category
const images: Record<GalleryCategory, string[]> = {
  dol: [
    'https://images.unsplash.com/photo-1617104678098-de229db51175?w=600&q=80',
    'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&q=80',
    'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=600&q=80',
    'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=600&q=80',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80',
  ],
  place: [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
    'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  ],
  hanbok: [
    'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=600&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80',
    'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=600&q=80',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
  ],
};

// Korean traditional color palettes (fallback)
const palettes: Record<GalleryCategory, string[]> = {
  dol: [
    'linear-gradient(145deg, #e8dfd2 0%, #d4c4b0 50%, #c9b89e 100%)',
    'linear-gradient(145deg, #f0e7db 0%, #e0d3c1 50%, #d5c7b3 100%)',
    'linear-gradient(145deg, #ebe4d8 0%, #ddd2c2 50%, #d0c3b1 100%)',
    'linear-gradient(145deg, #f4ede3 0%, #e5d9c9 50%, #d9ccba 100%)',
    'linear-gradient(145deg, #e6dcd0 0%, #d8cbb9 50%, #cdbda9 100%)',
    'linear-gradient(145deg, #efe6da 0%, #e2d5c5 50%, #d6c8b6 100%)',
  ],
  place: [
    'linear-gradient(145deg, #ddd0be 0%, #c9b89e 50%, #bfac8f 100%)',
    'linear-gradient(145deg, #e2d6c6 0%, #d4c5b1 50%, #c8b7a1 100%)',
    'linear-gradient(145deg, #d8cbb9 0%, #c9b9a5 50%, #bba991 100%)',
    'linear-gradient(145deg, #e0d4c4 0%, #d2c3af 50%, #c4b49e 100%)',
    'linear-gradient(145deg, #dbd0c0 0%, #cdc0ac 50%, #bfb09a 100%)',
    'linear-gradient(145deg, #e4d8c8 0%, #d6c7b3 50%, #c8b8a2 100%)',
  ],
  hanbok: [
    'linear-gradient(145deg, #f4ede3 0%, #e8dfd2 50%, #ddd0be 100%)',
    'linear-gradient(145deg, #f6f0e6 0%, #ebe3d6 50%, #e0d5c6 100%)',
    'linear-gradient(145deg, #f2ebe1 0%, #e6dcd0 50%, #dbcfc0 100%)',
    'linear-gradient(145deg, #f8f2e8 0%, #ede5d9 50%, #e2d8ca 100%)',
    'linear-gradient(145deg, #f0e9df 0%, #e4dad0 50%, #d9cfc1 100%)',
    'linear-gradient(145deg, #f5efe5 0%, #e9e0d4 50%, #ded4c5 100%)',
  ],
};

// Tag pools for each category
const tagPools: Record<GalleryCategory, string[]> = {
  dol: ['전통', '모던', '플로럴', '심플', '골드', '네추럴', '프리미엄', '미니멀', '럭셔리', '클래식'],
  place: ['호텔', '하우스', '가든', '스튜디오', '뷰포인트', '미니멀', '프라이빗', '한옥', '모던', '클래식'],
  hanbok: ['단아함', '풍성', '모노톤', '파스텔', '자수', '프리미엄', '고급원단', '맞춤', '전통', '모던'],
};

// Names for each category
const names: Record<GalleryCategory, { name: string; subtitle: string }[]> = {
  dol: [
    { name: '가온', subtitle: '아기 첫 돌을 위한 섬세한 디테일' },
    { name: '나린', subtitle: '우아하고 정갈한 전통의 품격' },
    { name: '다온', subtitle: '은은한 색감의 프리미엄 구성' },
    { name: '라온', subtitle: '모던과 전통의 조화로운 만남' },
    { name: '마루', subtitle: '심플하면서도 고급스러운 연출' },
    { name: '바름', subtitle: '자연스러운 플로럴 포인트' },
    { name: '사랑', subtitle: '따뜻한 감성의 특별한 상차림' },
    { name: '아람', subtitle: '세련된 골드 포인트 스타일' },
    { name: '자아', subtitle: '미니멀한 럭셔리 컨셉' },
    { name: '차이', subtitle: '독특한 개성의 시그니처 구성' },
    { name: '카림', subtitle: '클래식한 전통 병풍 스타일' },
    { name: '타래', subtitle: '정성이 담긴 수공예 디테일' },
    { name: '파란', subtitle: '청아한 색감의 봄 컨셉' },
    { name: '하늘', subtitle: '맑고 깨끗한 화이트 톤' },
  ],
  place: [
    { name: '청담 하우스', subtitle: '모던한 감성의 프라이빗 공간' },
    { name: '삼청동 한옥', subtitle: '전통미가 살아있는 특별한 장소' },
    { name: '가든 파티', subtitle: '자연과 함께하는 야외 세팅' },
    { name: '호텔 웨딩홀', subtitle: '품격 있는 대형 공간' },
    { name: '스튜디오 촬영', subtitle: '전문적인 조명과 배경' },
    { name: '루프탑 테라스', subtitle: '탁 트인 뷰와 함께' },
    { name: '북촌 게스트하우스', subtitle: '고즈넉한 한옥의 정취' },
    { name: '모던 갤러리', subtitle: '예술적 감성의 화이트 스페이스' },
    { name: '한강 뷰 스튜디오', subtitle: '환상적인 뷰를 배경으로' },
    { name: '성수 카페', subtitle: '트렌디한 분위기의 공간' },
    { name: '양재 플라워 가든', subtitle: '꽃과 함께하는 로맨틱 세팅' },
    { name: '이태원 빈티지하우스', subtitle: '독특한 개성의 복합 공간' },
    { name: '판교 모던하우스', subtitle: '깔끔한 현대식 인테리어' },
    { name: '제주 오션뷰', subtitle: '바다를 배경으로 한 특별함' },
  ],
  hanbok: [
    { name: '단아 시리즈', subtitle: '은은한 색감의 고급 한복' },
    { name: '연화 컬렉션', subtitle: '꽃 자수가 아름다운 한복' },
    { name: '청아 라인', subtitle: '맑고 청초한 파스텔 톤' },
    { name: '고운결 시리즈', subtitle: '전통 원단의 풍성한 실루엣' },
    { name: '진주 컬렉션', subtitle: '진주 장식의 화려한 디테일' },
    { name: '담비 라인', subtitle: '모노톤의 세련된 현대 한복' },
    { name: '설화 시리즈', subtitle: '겨울 시즌 특별 컬렉션' },
    { name: '봄날 컬렉션', subtitle: '산뜻한 봄 색감의 한복' },
    { name: '가을빛 시리즈', subtitle: '깊은 가을 색감의 고급라인' },
    { name: '달빛 컬렉션', subtitle: '은은한 광택의 야간 촬영용' },
    { name: '소담 시리즈', subtitle: '심플하고 단정한 스타일' },
    { name: '화려 라인', subtitle: '축제 분위기의 풍성한 한복' },
    { name: '궁중 컬렉션', subtitle: '왕실 스타일의 최고급 라인' },
    { name: '현대 퓨전', subtitle: '모던한 감성의 퓨전 한복' },
  ],
};

// Descriptions for each category
const descriptions: Record<GalleryCategory, string> = {
  dol: '전통 병풍과 단정한 색감을 중심으로 구성된 돌상 스타일입니다. 아이가 주인공이 될 수 있도록 절제된 디자인과 고급스러운 소품을 사용했습니다.',
  place: '잔치 분위기를 풍성하게 살려주는 공간 스타일링입니다. 장소의 특성을 살리면서도 초연만의 감각으로 특별한 순간을 연출해 드립니다.',
  hanbok: '실루엣과 소재의 균형으로 우아함을 강조한 한복입니다. 전통의 아름다움과 현대적인 감각이 조화를 이룬 프리미엄 컬렉션입니다.',
};

const makeItems = (category: GalleryCategory): GalleryItem[] => {
  const items: GalleryItem[] = [];
  const categoryImages = images[category];
  const categoryPalettes = palettes[category];
  const categoryTags = tagPools[category];
  const categoryNames = names[category];
  const description = descriptions[category];

  for (let i = 0; i < 14; i++) {
    const nameData = categoryNames[i % categoryNames.length];
    const tags = [
      categoryTags[i % categoryTags.length],
      categoryTags[(i + 3) % categoryTags.length],
    ].filter((tag, index, arr) => arr.indexOf(tag) === index);

    items.push({
      id: `${category}-${i + 1}`,
      category,
      title: `${nameData.name} ${category === 'dol' ? '돌상' : category === 'place' ? '' : ''}`,
      subtitle: nameData.subtitle,
      description,
      tags,
      image: categoryImages[i % categoryImages.length],
      palette: categoryPalettes[i % categoryPalettes.length],
    });
  }

  return items;
};

export const galleryItems: GalleryItem[] = [
  ...makeItems('dol'),
  ...makeItems('place'),
  ...makeItems('hanbok'),
];
