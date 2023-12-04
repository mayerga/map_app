import {defineComponent, onMounted, ref, watch} from 'vue';
import Mapboxgl from 'mapbox-gl';
import { usePlacesStore, useMapStore } from '@/composables';

export default defineComponent({
    name: 'MapView',
    setup() {

        const mapElement = ref<HTMLDivElement>();
        const { userLocation, isUserLocationReady } = usePlacesStore();
        const { setMap } = useMapStore();

        const initMap = async () => {
            if(!mapElement.value) throw new Error ('Div Element no existe');
            if(!userLocation.value) throw new Error ('User location no existe');
//Esto es para el pequeño error de resolución del mapa
            await Promise.resolve();

            const map = new Mapboxgl.Map({
                container: mapElement.value, // container ID
                style: 'mapbox://styles/mapbox/dark-v10', // style URL
                center: [-74.5, 40], // starting position [lng, lat]
                zoom: 15, // starting zoom
            });

            const myLocationPopup = new Mapboxgl.Popup()
                .setLngLat(userLocation.value)
                .setHTML(`
                <h4>Aquí estoy</h4>
                <p>Actualmente en Osuna</p>
                <p>${userLocation.value}</p>
                `);

            const myLocationMarker = new Mapboxgl.Marker()
                .setLngLat(userLocation.value)
                .setPopup(myLocationPopup)
                .addTo(map);
                //Todo: establecer el mapa en Vuex
                setMap(map);

        }

        onMounted(() => {
            // console.log(mapElement.value);
            if(isUserLocationReady.value) 
                return initMap()
        });

        watch(isUserLocationReady, (newVal) => {
            // console.log({newVal})
            if(isUserLocationReady.value) initMap();
        })

        return {
            isUserLocationReady,
            mapElement
        }
    }
});