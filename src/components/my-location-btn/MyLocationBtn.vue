<template>

    <button  v-if="isBtnReady"
        class="btn btn-primary"
        @click="onMyLocationClicked">
        Ir a mi ubicación
    </button>

</template>

<script lang="ts">
import { usePlacesStore, useMapStore } from '@/composables';
import { computed } from 'vue';


export default {
    name: 'MyLocationBtn',
    setup() {

        const { userLocation, isUserLocationReady } = usePlacesStore();
        const { map, isMapReady } = useMapStore();

        return {
            isBntReady: computed(() => isUserLocationReady.value && isMapReady.value),

            onMyLocationClicked: () => {
                map.value?.flyTo({
                    center: userLocation.value,
                    zoom: 14
                })
            }
        }
    }
}
</script>

<style scoped>
button {
    position: fixed;
    top: 30px;
    right: 30px;
}
</style>