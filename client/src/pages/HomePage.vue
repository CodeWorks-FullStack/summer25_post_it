<script setup>
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';

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
  </section>
</template>

<style scoped lang="scss"></style>
