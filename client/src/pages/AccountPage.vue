<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { watchersService } from '@/services/WatchersService.js';
import AlbumCard from '@/components/AlbumCard.vue';

const account = computed(() => AppState.account)
const watcherAlbums = computed(() => AppState.watcherAlbums)

onMounted(() => {
  getMyWatchedAlbums()
})

async function getMyWatchedAlbums() {
  try {
    await watchersService.getMyWatchedAlbums()
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT GET WATCHED ALBUMS', error)
  }
}

</script>

<template>
  <div v-if="account" class="container">
    <div class="row">
      <div class="col-12">
        <div class="mt-5 text-center">
          welcome back <span class="text-white">{{ account.name }}</span>
          <img :src="account.picture" :alt="account.name" class="account-img ms-2">
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="watcherAlbum in watcherAlbums" :key="watcherAlbum.id" class="col-md-4 mb-3">
        <AlbumCard :album="watcherAlbum.album" />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="text-center mt-5">Loading... <span class="mdi mdi-pinwheel mdi-spin"></span></div>
  </div>
</template>

<style scoped lang="scss">
.account-img {
  height: 60px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}
</style>
