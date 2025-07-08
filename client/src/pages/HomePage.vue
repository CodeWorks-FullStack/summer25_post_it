<script setup>
import { AppState } from '@/AppState.js';
import AlbumCard from '@/components/AlbumCard.vue';
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

const albums = computed(() => {

  if (selectedCategory.value == 'all') {
    return AppState.albums
  }

  return AppState.albums.filter(album => album.category == selectedCategory.value)
})

const selectedCategory = ref('all')

const categories = [
  {
    name: 'all',
    img: 'https://images.unsplash.com/photo-1528818955841-a7f1425131b5?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RhcnJ5JTIwc2t5fGVufDB8fDB8fHwy'
  },
  {
    name: 'animals',
    img: 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHN8ZW58MHx8MHx8fDI%3D'
  },
  {
    name: 'vibes',
    img: 'https://images.unsplash.com/photo-1541423408854-5df732b6f6d1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMHNreWxpbmV8ZW58MHx8MHx8fDI%3D'
  },
  {
    name: 'games',
    img: 'https://images.unsplash.com/photo-1533654238074-8841f6e8e610?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGFyY2FkZXxlbnwwfHwwfHx8Mg%3D%3D'
  },
  {
    name: 'aesthetics',
    img: 'https://images.unsplash.com/photo-1673313530503-39b757cc1572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXQlMjBmdWppfGVufDB8fDB8fHwy'
  },
  {
    name: 'food',
    img: 'https://scrandle.com/scran_img/F7WSUNcXAAA02lt.webp'
  },
  {
    name: 'misc',
    img: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFic3RyYWN0fGVufDB8fDB8fHwy'
  },
]


onMounted(() => {
  getAlbums()
})

async function getAlbums() {
  try {
    await albumsService.getAlbums()
  } catch (error) {
    logger.error('COULD NOT GET ALBUMS', error)
    Pop.error(error)
  }
}

</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="fredoka-font fw-bold border-bottom border-gray my-3">
          Find Your Interest
        </h2>
      </div>
    </div>
    <div class="row">
      <div v-for="category in categories" :key="category.name" class="col-6 col-md-3 mb-3">
        <div @click="selectedCategory = category.name" class="py-4 rounded category-bg"
          :style="{ backgroundImage: `url(${category.img})` }" role="button">
          <div class="text-center text-capitalize fs-2" :class="{ 'underline': category.name == selectedCategory }">
            {{ category.name }}
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3 mb-3">
        <div class="py-4 rounded category-bg green-bg" role="button">
          <div class="text-center text-capitalize fs-2">Create +</div>
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="fredoka-font fw-bold border-bottom border-gray my-3">
          Popular Albums
        </h2>
      </div>
    </div>
    <div class="row">
      <div v-for="album in albums" :key="album.id" class="col-md-4 mb-3">
        <AlbumCard :album="album" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.category-bg {
  background-size: cover;
  text-shadow: 1px 2px black;
  background-position: bottom;
}

.green-bg {
  background-image: url(https://images.unsplash.com/photo-1588097247274-a174dd59f20d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWJzdHJhY3QlMjBncmVlbnxlbnwwfHwwfHx8Mg%3D%3D);
}

.underline {
  text-decoration: underline;
  text-decoration-color: var(--bs-success);
}
</style>
