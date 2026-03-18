<template>
  <div class="news-feed-list">
    <h3 v-if="title" class="news-feed-list__section-title">{{ title }}</h3>
    
    <div class="news-feed-list__items">
      <article 
        v-for="(item, index) in feed" 
        :key="index" 
        class="news-feed-list__item"
        :class="{ 'news-feed-list__item--highlighted': item.highlighted }"
      >
        <div v-if="item.image" class="news-feed-list__media">
          <router-link :to="`/${currentLocale}/news/${index}`">
            <img :src="item.image" :alt="item.title" class="news-feed-list__img" />
          </router-link>
        </div>
        <div class="news-feed-list__content">
          <div class="news-feed-list__time">{{ item.time }}</div>
          <h4 class="news-feed-list__title">
            <router-link :to="`/${currentLocale}/news/${index}`">{{ item.title }}</router-link>
          </h4>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  title: {
    type: String,
    default: undefined
  },
  feed: {
    type: Array,
    required: true
  }
})

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as vars;

.news-feed-list {
  display: flex;
  flex-direction: column;

  &__section-title {
    font-family: "Roboto Slab", serif;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    color: vars.$primary-color;
    margin: 0 0 20px 0;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 1024px) {
      gap: 20px;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-bottom: none;
    
    &:last-child {
      border-bottom: none;
    }

    &--highlighted {
      .news-feed-list__title a {
        color: vars.$primary-color;
      }
    }

    @media (max-width: 1024px) {
      display: flex;
      flex-direction: row;
      gap: 12px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 5px;

    @media (max-width: 1024px) {
      display: block;
    }
  }

  &__media {
    display: none;
    flex-shrink: 0;
    width: 140px;
    height: 90px;
    border-radius: 8px;
    overflow: hidden;

    @media (max-width: 1024px) {
      display: block;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__time {
    color: #999;
    font-size: 13px;
    font-weight: 500;

    @media (max-width: 1024px) {
      float: left;
      padding: 0 5px 0 0;
    }
  }

  &__title {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
    line-height: 1.4;
    margin: 0;
    font-weight: 500;
    
    a {
      color: vars.$text-color;
      text-decoration: none;
      transition: color 0.2s;
      
      &:hover {
        color: vars.$primary-color;
      }
    }
  }

  @media (max-width: 768px) {
    &__item {
      flex-direction: row;
      align-items: flex-start;
      gap: 15px;
    }

    &__media {
      display: block;
    }
  }
  
  @media (max-width: 500px) {
    &__media {
      width: 120px;
      height: 75px;
    }
  }
}
</style>
