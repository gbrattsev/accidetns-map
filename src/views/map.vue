<template>  
  <v-app id="inspire">
    <v-card
    color="grey lighten-4"
    flat
    tile
    >
        <v-toolbar>
        <v-toolbar-title>ДомСофт</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn to="/map">
            Карта
        </v-btn>
        <v-btn to="/form">
            Форма
        </v-btn>
        </v-toolbar>
    </v-card>
    <yandex-map
        v-if="coords"
        :coords="coords"
        :zoom="16" 
        @click="onClick"
    >
        <ymap-marker
            v-for="n in markers"
            :key="n.id"
            :marker-id="n.id"
            :coords="n.coords"
            :balloon-template="balloonTemplate"
        ></ymap-marker>
    </yandex-map>
  </v-app>
</template>
<script>
// import firebase from 'firebase'
import { yandexMap, ymapMarker, loadYmap } from 'vue-yandex-maps';
export default {
  
    name: 'Map',
        components: {
        yandexMap,
        ymapMarker,
    },
    data: () => ({
        coords: null,
        markers: [
            {
                id: 1,
                coords: [
                    57.13653564049404,
                    65.58163184603269,
                ],
            },
        ],
        settings: {
          apiKey: 'df8c4e17-1449-4f39-9fa7-565bb7a180f2',
          lang: 'ru_RU',
          coordorder: 'latlong',
          version: '2.1'            
        },
    }),
  computed: {
    balloonTemplate() {
      return `
        <h3>Привет</h3>
        <p>Авария здесь: ${this.coords}</p>
      `
    }
  },
    methods: {
        onClick(e) {
            this.markers.push({
            id: 1 + Math.max(0, ...this.markers.map(n => n.id)),
            coords: e.get('coords'),
            });
            console.log(this.markers);
            
        },
    },
    async mounted() {
        await loadYmap({ ...this.settings, debug: true });

        ymaps.geolocation.get().then(res => {
            this.coords = res.geoObjects.position;
        });
    },
}
</script>
