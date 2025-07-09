<script setup>
import { AppState } from '@/AppState.js';
import ModalWrapper from '@/components/ModalWrapper.vue';
import PictureForm from '@/components/PictureForm.vue';
import { albumsService } from '@/services/AlbumsService.js';
import { picturesService } from '@/services/PicturesService.js';
import { watchersService } from '@/services/WatchersService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const album = computed(() => AppState.album)
const account = computed(() => AppState.account)
const watcherProfiles = computed(() => AppState.watcherProfiles)
const pictures = computed(() => AppState.pictures)

const route = useRoute()

onMounted(() => {
  getAlbumById()
  getWatchersByAlbumId()
  getPicturesByAlbumId()
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

async function archiveAlbum() {
  const confirmed = await Pop.confirm(`Are you sure you want to ${album.value.archived ? 'unarchive' : 'archive'} your ${album.value.title} album?`, '', 'Yes', 'No',)

  if (!confirmed) return

  try {
    const albumId = route.params.albumId
    await albumsService.archiveAlbum(albumId)
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT ARCHIVE ALBUM', error)
  }
}

async function getWatchersByAlbumId() {
  try {
    const albumId = route.params.albumId
    await watchersService.getWatchersByAlbumId(albumId)
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT GET WATCHERS', error)
  }
}

async function createWatcher() {
  try {
    // NOTE the data you send as the request body must be formatted as an object with the correct key:value pairs that your api is expecting
    const watcherData = { albumId: route.params.albumId }
    await watchersService.createWatcher(watcherData)
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT CREATE WATCHER', error)
  }
}

async function getPicturesByAlbumId() {
  try {
    const albumId = route.params.albumId
    await picturesService.getPicturesByAlbumId(albumId)
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT GET PICTURES', error)
  }
}

</script>


<template>
  <div v-if="album" class="container">

    <!-- SECTION album details -->
    <section class="row cover-img justify-content-center align-items-end rounded mt-3"
      :style="{ backgroundImage: `url(${album.coverImg})` }">
      <div class="col-md-8 mb-2">
        <div class="glass-card rounded p-2">
          <div class="mb-5">
            <h1 class="text-center">{{ album.title }}</h1>
            <p v-if="album.archived" class="text-center fs-5">
              <span class="mdi mdi-sign-caution text-warning"></span>
              {{ album.title }} is archived and no longer accepting new pictures
              <span class="mdi mdi-sign-caution text-warning"></span>
            </p>
            <p v-if="album.description">{{ album.description }}</p>
          </div>
          <div class="d-md-flex justify-content-between align-items-end">
            <div class="text-center text-md-start mb-3 mb-md-0">
              <span class="bg-info px-3 py-1 rounded-pill me-2">{{ album.category }}</span>
              <span @click="archiveAlbum()" v-if="album.creatorId == account?.id"
                class="bg-danger px-3 py-1 rounded-pill" role="button">
                {{ album.archived ? 'Unarchive' : 'Archive' }} Album <span class="mdi mdi-close-circle"></span>
              </span>
            </div>
            <div class="d-flex align-items-end justify-content-center">
              <span>Created by {{ album.creator.name }}</span>
              <img :src="album.creator.picture" :alt="album.creator.name" class="creator-img ms-2">
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- !SECTION -->

    <div class="row mt-3">
      <!-- SECTION watcher profiles -->
      <section class="col-md-3">
        <div class="d-flex mb-3">
          <div class="glass-card p-2 rounded flex-grow-1">
            <b class="d-block">{{ album.watcherCount }}</b>
            <b>Watchers</b>
          </div>
          <button @click="createWatcher()" v-if="account" class="btn btn-success" type="button">
            <span class="mdi mdi-account-plus d-block"></span>
            Join
          </button>
        </div>
        <div class="row">
          <div v-for="watcherProfile in watcherProfiles" :key="watcherProfile.id" class="col-3 col-md-4 mb-3">
            <img :src="watcherProfile.profile.picture" :alt="watcherProfile.profile.name" class="profile-img rounded"
              :title="`${watcherProfile.profile.name} has been watching this album since ${watcherProfile.createdAt.toLocaleString()}`">
          </div>
        </div>
      </section>
      <!-- !SECTION -->

      <!-- SECTION pictures -->
      <section class="col-md-9">
        <div class="masonry-container">
          <div v-for="picture in pictures" :key="picture.id" class="mb-3 position-relative">
            <img :src="picture.imgUrl" :alt="`A picture submitted by ${picture.creator.name}`"
              class="img-fluid rounded">
            <div class="magic-creator-info m-2">
              <kbd>{{ picture.creator.name }}</kbd>
              <img :src="picture.creator.picture" :alt="picture.creator.name">
            </div>
          </div>
        </div>
      </section>
      <!-- !SECTION -->
    </div>
    <button v-if="account" class="btn btn-success fixed-button m-2" type="button" data-bs-toggle="modal"
      data-bs-target="#pictureModal" :disabled="album.archived">
      Add Picture <span class="mdi" :class="album.archived ? 'mdi mdi-sign-caution' : 'mdi-plus-box'"></span>
    </button>
  </div>
  <section v-else class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Loading... <span class="mdi mdi-pinwheel mdi-spin"></span></h1>
      </div>
    </div>
  </section>

  <ModalWrapper modalId="pictureModal" modalHeader="Create Picture">
    <!-- injects the PictureForm into the ModalWrapper's <slot> -->
    <PictureForm />
  </ModalWrapper>
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

.profile-img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  box-shadow: 3px 3px var(--bs-white);
}

.fixed-button {
  position: fixed;
  bottom: 0;
  right: 0;
}

.masonry-container {
  columns: 200px;

  >* {
    break-inside: avoid;
    display: inline-block;
  }
}

.magic-creator-info {
  position: absolute;
  bottom: 0;
  left: 0;

  img {
    height: 40px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
    margin-inline-start: 1rem;
  }
}
</style>