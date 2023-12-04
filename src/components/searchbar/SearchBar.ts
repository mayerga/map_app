import {computed, ref} from 'vue';

import {usePlacesStore} from '@/composables'

import SearchResults from '@/components/search-results/SearchResults.vue';

export default ({
    
    name: 'SearchBar',
    components: {SearchResults},
    setup() {

        const debounceTimeout = ref();
        const debouncedValue = ref('');

        const {searchPlacesByTerm} = usePlacesStore();

        return {
            debouncedValue,

            searchTerm: computed({
                get() {
                    return debouncedValue.value;
                },
                set(val: string) {
//Cada vez que la persona escriba algo, va a limpiar el timeout
//Cuando deja de escribir se limpia el últmo timeout y se ejecuta l siguiente línea
                    if(debounceTimeout.value) clearTimeout(debounceTimeout.value)
                    debounceTimeout.value = setTimeout(() => {
                        debouncedValue.value = val;
                        searchPlacesByTerm(val);
                    }, 500);
                }
            })
        }
    }
});