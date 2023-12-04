import { ActionTree } from 'vuex';
import { PlacesState } from './state';
import { StateInterface } from '../index';
import { searchApi } from '@/apis';
import { PlacesResponse } from '@/interfaces/places';


const actions: ActionTree<PlacesState, StateInterface> = {
    getInitialLocation( {commit} ) {
        navigator.geolocation.getCurrentPosition(
            ({coords}) => commit('setLngLat', {lng: coords.longitude, lat: coords.latitude}),
            (err) => {
                console.error(err)
                throw new Error('No geolocation :(')
            }
        );
    },

    //Todo: colocar el valor de retorno
    async searchPlacesByTerm({commit, state}, query: string) {
    // console.log('Vuex: ', query);

        const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
            params: {
//lng y lat para unirlas separados por la ,
                proximity: state.userLocation?.join(',')
            }
        });
        console.log(resp.data.features);
    }
}



export default actions;