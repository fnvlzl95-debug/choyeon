<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    <!-- Item 1: 전통상 -->
    <div class="group cursor-pointer">
      <div class="overflow-hidden bg-gray-100 aspect-[4/5] relative">
        <img
          src="https://images.unsplash.com/photo-1628045939268-c11f7869615a?q=80&w=1500&auto=format&fit=crop"
          alt="전통 돌상"
          class="w-full h-full object-cover img-hover-zoom"
        />
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
      </div>
      <div class="mt-4 text-center md:text-left">
        <h4 class="font-serif-kr text-lg font-medium text-[#222]">프리미엄 전통상 [가온]</h4>
        <p class="text-xs text-[#888] mt-1 uppercase tracking-wider">Traditional Premium</p>
      </div>
    </div>

    <!-- Item 2: 현대상 -->
    <div class="group cursor-pointer">
      <div class="overflow-hidden bg-gray-100 aspect-[4/5] relative">
        <img
          src="https://images.unsplash.com/photo-1530103862676-de3c9da59af7?q=80&w=1500&auto=format&fit=crop"
          alt="현대식 돌상"
          class="w-full h-full object-cover img-hover-zoom"
        />
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
      </div>
      <div class="mt-4 text-center md:text-left">
        <h4 class="font-serif-kr text-lg font-medium text-[#222]">모던 플라워상 [순수]</h4>
        <p class="text-xs text-[#888] mt-1 uppercase tracking-wider">Modern Flower</p>
      </div>
    </div>

    <!-- Item 3: 퓨전상 -->
    <div class="group cursor-pointer">
      <div class="overflow-hidden bg-gray-100 aspect-[4/5] relative">
        <img
          src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1500&auto=format&fit=crop"
          alt="퓨전 돌상"
          class="w-full h-full object-cover img-hover-zoom"
        />
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
      </div>
      <div class="mt-4 text-center md:text-left">
        <h4 class="font-serif-kr text-lg font-medium text-[#222]">내추럴 우드상 [해원]</h4>
        <p class="text-xs text-[#888] mt-1 uppercase tracking-wider">Natural Concept</p>
      </div>
    </div>

    <!-- 추가 이미지들 (2열) -->
    <div class="group cursor-pointer lg:col-span-2">
      <div class="overflow-hidden bg-gray-100 aspect-[16/9] relative">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1500&auto=format&fit=crop"
          alt="소품 디테일"
          class="w-full h-full object-cover img-hover-zoom"
        />
      </div>
      <div class="mt-4 text-center md:text-left">
        <h4 class="font-serif-kr text-lg font-medium text-[#222]">소품 디테일</h4>
        <p class="text-xs text-[#888] mt-1">정성스러운 소품 하나하나가 차이를 만듭니다.</p>
      </div>
    </div>

    <div class="group cursor-pointer">
      <div class="overflow-hidden bg-gray-100 aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/5] relative">
        <img
          src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1500&auto=format&fit=crop"
          alt="한복 대여"
          class="w-full h-full object-cover img-hover-zoom"
        />
      </div>
      <div class="mt-4 text-center md:text-left">
        <h4 class="font-serif-kr text-lg font-medium text-[#222]">프리미엄 한복</h4>
        <p class="text-xs text-[#888] mt-1 uppercase tracking-wider">Costume Rental</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.img-hover-zoom {
  transition: transform 0.5s ease;
}

.group:hover .img-hover-zoom {
  transform: scale(1.05);
}
</style>
