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

async function deleteWatcher(watcherId) {
  const confirmed = await Pop.confirm('Are you sure you want to leave this album?')

  if (!confirmed) return
  try {
    logger.log('deleting watcher', watcherId)
    await watchersService.deleteWatcher(watcherId)
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT DELETE WATCHER', error)
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
        <div class="my-5 text-center">
          you are watching {{ watcherAlbums.length }} albums
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="watcherAlbum in watcherAlbums" :key="watcherAlbum.id" class="col-md-4 mb-4">
        <div class="position-relative">
          <AlbumCard :album="watcherAlbum.album" />
          <div class="text-end mt-1">
            <button @click="deleteWatcher(watcherAlbum.id)" class="btn btn-danger rounded-pill magic-button m-2"
              type="button">
              Leave <span class="mdi mdi-door-open"></span>
            </button>
          </div>
        </div>
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

.magic-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
