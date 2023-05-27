import axios from 'axios'

const appid = '7efa332cf48aeb9d2d391a51027f1a71'
export const OneCallWeather = params =>
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lng}&exclude={part}&appid=${appid}&units=metric&lang=zh_cn`);
    
export const MainWeather = city =>
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&exclude={part}&appid=${appid}&units=metric&lang=zh_cn`)