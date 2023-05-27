

<template>
  <main class="container text-white">
    <div calss="pt-4 mb-8 relative">
      <input type="text" placeholder="输入城市或国家以搜索"
      v-model="searchQuery"
      @input="getSearchResults"
      class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
      <ul class="absolute bg-weather-secondary text-white w-full 
      shadow-md py-2 px-1 top-[125px]"
      v-if="mapboxSearchResults">
        <p v-if="searchError">糟糕，出错了</p>  
        <p v-if="!searchError&&mapboxSearchResults.length===0">没有查询到相关结果</p>  
        <template v-else>
          <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)">
            {{ searchResult.text }}， {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <template #default>
          <CityList/>
        </template>
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";
import { SearchCity } from "../api/mapbox";

const router = useRouter();
const previewCity = (searchResult) =>{
  router.push({
    name:"cityView",
    params:{state:searchResult.place_name,city:searchResult.text},
    query:{
      lat:searchResult.geometry.coordinates[1],
      lng:searchResult.geometry.coordinates[0],
      preview:true
    }
  })
}

const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () =>{
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async() => {
    if(searchQuery.value !== ""){
      try {
        const result = await SearchCity(searchQuery.value);
        mapboxSearchResults.value = result.data.features;
        console.log(mapboxSearchResults.value);
      } catch (error) {
        searchError.value = error
      }
        return;
    }
    mapboxSearchResults.value = null;
  }, 300);
}
</script>
