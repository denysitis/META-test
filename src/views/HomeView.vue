<template>
  <div class="home-view">
    <TrendingTags :tags="topTags" />

    <div class="container main-container">
      <div class="page-grid">
        
        <aside class="page-grid__left">
          <NewsFeedList :title="$t('home.sidebar_news')" :feed="newsFeedList" />
        </aside>

        <section class="page-grid__center">
          <h2 class="mobile-section-title">{{ $t('home.sidebar_news') }}</h2>
          <MainHeroNews :news="mainHeroNews" />
        </section>

        <aside class="page-grid__right">
          <SideTopStories :stories="sideTopStories" />
          <div class="page-grid__action page-grid__action--desktop">
            <BaseButton :to="`/${currentLocale}/news`">
              {{ $t('home.more_news') }}
            </BaseButton>
          </div>
        </aside>

        <div class="page-grid__action page-grid__action--mobile">
          <BaseButton :to="`/${currentLocale}/news`">
            {{ $t('home.more_news') }}
          </BaseButton>
        </div>

      </div>
      <div class="page-grid__separator"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TrendingTags from '../components/TrendingTags.vue'
import NewsFeedList from '../components/NewsFeedList.vue'
import MainHeroNews from '../components/MainHeroNews.vue'
import SideTopStories from '../components/SideTopStories.vue'
import BaseButton from '../components/BaseButton.vue'

import { topTags, newsFeedList, mainHeroNews, sideTopStories } from '../data/mockNews'

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as vars;

.home-view {
  background-color: #ffffff;
}

.main-container {
  padding-top: 16px;
  padding-bottom: 50px;

  @media (max-width: 1024px) {
    padding-top: 0;
  }
}

.page-grid {
  display: grid;
  grid-template-columns: 280px 1fr 300px;
  gap: 40px;
  
  &__action {
    display: flex;
    justify-content: flex-start;
    
    &--desktop {
      margin-top: 25px;
      @media (max-width: 1024px) {
        display: none;
      }
    }
    
    &--mobile {
      display: none;
    }
  }

  &__separator {
    margin-top: 50px;
    border-top: 2px dashed #eaeaea;
    width: 100%;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 300px;
    grid-template-areas: 
      "center right"
      "left left"
      "action action";
      
    &__left { 
      grid-area: left; 
      margin-top: 20px;
    }
    &__center { 
      grid-area: center; 
    }
    &__right { 
      grid-area: right; 
      margin: 50px 0 0 0; 

      @media (max-width: 768px) {
        margin: 0;
      }
    }

    &__action--mobile { 
      order: 4;
      display: flex;
      justify-content: center;
      width: 100%;
      margin-inline: 0;
      grid-area: action;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 32px;
    
    &__center, &__right, &__left {
      min-width: 0;
      width: 100%;
    }
    
    &__right {
      order: 2;
      margin: 0;
      width: calc(100% + 24px);
      margin-inline: -12px;
    }
    
    &__center { order: 1; }
    &__left { order: 3; }
    
    
  }
}

.mobile-section-title {
  display: none;
  font-family: 'Roboto Slab', serif;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  color: vars.$primary-color;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    display: block;
    margin: 0 0 12px 4px;
  }
}
</style>
