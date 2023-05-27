<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="gotoCityView(city)" />
  </div>
  <div v-if="savedCities.length === 0" class="text-white p-4 w-full text-center">
    <p>未添加城市，请在上方进行搜索</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CityCard from './CityCard.vue';
import { useRouter } from 'vue-router';
import { MainWeather } from '../api/weather';

const savedCities = ref([]);
const appid = '7efa332cf48aeb9d2d391a51027f1a71'

const getCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
  }
  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(MainWeather(city));
  });


  const weatherData = await Promise.all(requests);

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
  });
};

await getCities();

const router = useRouter();
const gotoCityView = (city) => {
  router.push({
    name: 'cityView',
    params: { state: city.state, city: city.city },
    query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng }
  })
}

</script>