<script setup>
import { picturesService } from '@/services/PicturesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const editablePictureData = ref({
  imgUrl: '',
  albumId: route.params.albumId
})

async function createPicture() {
  try {
    await picturesService.createPicture(editablePictureData.value)
    editablePictureData.value.imgUrl = ''
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT CREATE PICTURE', error)
  }
}
</script>


<template>
  <form @submit.prevent="createPicture()">
    <div class="form-floating mb-3">
      <input v-model="editablePictureData.imgUrl" type="url" class="form-control" id="picture-img-url"
        placeholder="Picture Image URL..." required maxLength="500">
      <label for="picture-img-url">Picture Image URL</label>
    </div>
    <div class="text-end">
      <button class="btn btn-success" type="submit">Add Picture</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>