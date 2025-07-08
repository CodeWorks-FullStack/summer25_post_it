<script setup>
import { Album } from '@/models/Album.js';

defineProps({
  album: { type: Album, required: true },
})
</script>


<template>
  <RouterLink :to="{ name: 'Album Details', params: { albumId: album.id } }" :title="`Go to the ${album.title} page`">
    <div :style="{ backgroundImage: `url(${album.coverImg})` }"
      class="rounded album-card p-2 d-flex flex-column justify-content-end">
      <div class="glass-card p-2 rounded d-flex justify-content-between align-items-center">
        <div>
          <b>{{ album.title }}</b>
          <span v-if="album.archived" class="mdi mdi-sign-caution text-warning ms-2"
            :title="`${album.title} is archived`"></span>
          <div>
            <img :src="album.creator.picture" :alt="album.creator.name">
            <span class="ms-2">{{ album.creator.name }}</span>
          </div>
        </div>
        <div>
          <!-- TODO put watcherCount here when done -->
          <b>0</b>
          <span class="mdi mdi-account-multiple ms-2"></span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
.album-card {
  min-height: 40dvh;
  background-size: cover;
  background-position: center;
}

img {
  height: 2rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

a {
  text-decoration: none;
  color: var(--bs-white);
}
</style>