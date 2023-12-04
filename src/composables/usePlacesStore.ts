import { computed, onMounted } from 'vue';
import { StateInterface } from '@/store/index';
import {useStore} from 'vuex';

export const usePlacesStore = () => {

    const store = useStore<StateInterface>();

    onMounted(() => {
        if( !store.getters['plaes/isUserLocationReady'] ) {
            store.dispatch('places/getInitialLocation');
        }
    });

    return {
        //State
        isLoading: computed(() => store.state.places.isLoading),
        userLocation: computed(() => store.state.places.userLocation),


        //Getters
        isUserLocationReady: computed<boolean>(() => store.getters['places/isUserLocationReady']),

        //Actions
        searchPlacesByTerm: (query = '') => store.dispatch('places/searchPlacesByTerm', query),

        //Mutations
    }
}
