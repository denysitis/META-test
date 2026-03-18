<template>
  <div class="trending-tags">
    <div class="trending-tags__inner container">
      <div class="trending-tags__scroller">
        <router-link 
          v-for="tag in tags" 
          :key="tag.id" 
          :to="`/${currentLocale}/tags/${tag.id}`" 
          class="trending-tags__tag" 
          :class="{ 'trending-tags__tag--alert': tag.alert }"
        >
          <span v-if="tag.alert" class="trending-tags__icon">
            <img src="@/assets/icons/category-icon.svg" alt="alert">
          </span>
          {{ tag.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  tags: {
    type: Array,
    required: true
  }
})

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as vars;

.trending-tags {
  background-color: vars.$secondary-color;
  padding: 24px 0 16px;

  @media (max-width: 1024px) {
    padding: 12px 0 16px;
  }
  
  &__inner {
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__scroller {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 12px;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    padding: 6px 16px;
    color: vars.$text-color;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    &--alert {
      color: #333;
      .trending-tags__icon {
        display: flex;
        align-items: center;
        img {
          width: 21px;
          height: 16px;
        }
      }
    }
  }
}
</style>
