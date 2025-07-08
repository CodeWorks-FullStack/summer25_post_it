<script setup>
import { AppState } from '@/AppState.js';
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const album = computed(() => AppState.album)

const route = useRoute()

onMounted(() => {
  getAlbumById()
})

async function getAlbumById() {
  try {
    const albumId = route.params.albumId
    await albumsService.getAlbumById(albumId)
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT GET ALBUM', error)
  }
}

</script>


<template>
  <section v-if="album" class="container">
    <div class="row cover-img justify-content-center align-items-end rounded mt-3"
      :style="{ backgroundImage: `url(${album.coverImg})` }">
      <div class="col-md-8 mb-2">
        <div class="glass-card rounded p-2">
          <div class="mb-5">
            <h1 class="text-center">{{ album.title }}</h1>
            <p v-if="album.description">{{ album.description }}</p>
          </div>
          <div class="d-flex justify-content-between align-items-end">
            <div>
              <span class="bg-info px-3 py-1 rounded-pill me-2">{{ album.category }}</span>
              <span class="bg-danger px-3 py-1 rounded-pill" role="button">
                Archive Album <span class="mdi mdi-close-circle"></span>
              </span>
            </div>
            <div class="d-flex align-items-end">
              <span>Created by {{ album.creator.name }}</span>
              <img :src="album.creator.picture" :alt="album.creator.name" class="creator-img ms-2">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Loading... <span class="mdi mdi-pinwheel mdi-spin"></span></h1>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.cover-img {
  background-size: cover;
  background-position: center;
  min-height: 55dvh;
}

.creator-img {
  height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>