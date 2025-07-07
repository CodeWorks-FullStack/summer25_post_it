<script setup>
import { AppState } from '@/AppState.js';
import AlbumCard from '@/components/AlbumCard.vue';
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const albums = computed(() => AppState.albums)

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
  <!-- TODO make the filter bar -->
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

<style scoped lang="scss"></style>
