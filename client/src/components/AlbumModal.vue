<script setup>
import AlbumForm from './AlbumForm.vue';


</script>


<template>
  <div class="modal fade" id="albumModal" tabindex="-1" aria-labelledby="albumModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="albumModalLabel">Create Album</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <AlbumForm />
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>