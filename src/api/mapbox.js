import axios from 'axios'

const mapboxAPIKey = 'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q';
export const SearchCity = params =>
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${params}.json?access_token=${mapboxAPIKey}&types=place&language=zh-cn`)
    