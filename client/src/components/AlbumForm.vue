<script setup>
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// NOTE allows us to programmatically change information about the current route
const router = useRouter()

const categories = ['aesthetics', 'food', 'games', 'animals', 'vibes', 'misc']

const editableAlbumData = ref({
  title: '',
  description: '',
  coverImg: '',
  category: ''
})

async function createAlbum() {
  try {
    const albumId = await albumsService.createAlbum(editableAlbumData.value)
    // clears form
    editableAlbumData.value = {
      title: '',
      description: '',
      coverImg: '',
      category: ''
    }
    // closes modal
    Modal.getOrCreateInstance('#albumModal').hide()

    router.push({ name: 'Album Details', params: { albumId: albumId } })
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT CREATE', error)
  }
}
</script>


<template>
  <form @submit.prevent="createAlbum()">
    <div class="form-floating mb-3">
      <input v-model="editableAlbumData.title" type="text" class="form-control" id="album-title"
        placeholder="Album Title..." required minlength="3" maxlength="25">
      <label for="album-title">Album Title</label>
    </div>
    <div class="form-floating mb-3">
      <!-- NOTE no rows! -->
      <textarea v-model="editableAlbumData.description" class="form-control" placeholder="Album Description..."
        id="album-description" minlength="15" maxlength="250"></textarea>
      <label for="album-description">Album Description</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableAlbumData.coverImg" type="url" class="form-control" id="album-cover-img"
        placeholder="Album Cover Image..." required maxlength="500">
      <label for="album-cover-img">Album Cover Image</label>
    </div>
    <div class="form-floating mb-3">
      <select v-model="editableAlbumData.category" class="form-select" id="album-category" aria-label="Album Category"
        required>
        <option selected disabled value="">Choose a category</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <label for="album-category">Album Category</label>
    </div>
    <div class="text-end">
      <button class="btn btn-success" type="submit">
        Create Album
      </button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
textarea {
  min-height: 6rem !important;
}
</style>