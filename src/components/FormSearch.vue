<template>
  <div>
    <v-app id="inspire">
      <v-card
          color="red lighten-2"
          dark
      >
        <v-card-title class="text-h5 red lighten-3">
          Search for Public APIs
        </v-card-title>
        <v-card-text>
          Explore hundreds of free API's ready for consumption! For more information visit
          <a
              class="grey--text text--lighten-3"
              href="https://github.com/toddmotto/public-apis"
              target="_blank"
          >the GitHub repository</a>.
        </v-card-text>

        <v-card-text>
          <v-autocomplete
              v-model="model"
              :items="items"
              :search-input.sync="search"
              color="white"
              item-text="name"
              item-value="value"
              label="Public APIs"
              placeholder="Start typing to Search"
              :loading="isLoading"
              filled
              dense
              return-object
              hide-no-data
              no-filter
          >

            <template v-slot:append-item>
              <div v-intersect="endIntersect"/>
            </template>

          </v-autocomplete>

        </v-card-text>


        <v-expand-transition>

          <v-list
              v-if="model"
              class="red lighten-3"
          >
            <v-list-item
                v-for="(field, i) in fields"
                :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="field.value"></v-list-item-title>
                <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          </v-list>

        </v-expand-transition>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              :disabled="!model"
              color="grey darken-3"
              @click="model = null"
          >
            Clear
            <v-icon right>
              mdi-close-circle
            </v-icon>
          </v-btn>
        </v-card-actions>


      </v-card>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';
// import LoadData from './LoadData'
export default {
  name: 'App',
  components: {
    // LoadData
  },
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    seacrchName: null,
    value: "",
    page: 1,
    pageSize: 9,
    isIntersecting: false,
    beer_name: '',
    isLoadData: true,



  }),

  created() {

    if (this.items.length > 0) return

    // Items have already been requested
    if (this.isLoading) return


    // Lazily load input items
    try {

      axios.get("https://api.punkapi.com/v2/beers",
          {
            params: {
              page: this.page,
              per_page: this.pageSize
            }
          })
          .then(res => this.entries = res.data);

    } catch (err) {
      console.log("err", err)
    }

  },

  methods: {

    getDataBeer: async function (params) {
      return await axios.get("https://api.punkapi.com/v2/beers", {params})
    },

    loadMoreFromApi(){
     if(!this.beer_name){
       this.getDataBeer({page: ++this.page, per_page: this.pageSize}).then(res => {
         let moreEntries = res.data;
         if (moreEntries.length <= 8){
           this.isLoadData = false;
         }
         this.entries = [...this.entries, ...moreEntries]
       }).catch(error => console.log("error", error))
     }

     else {
       this.getDataBeer({beer_name: this.beer_name, page: ++this.page, per_page: this.pageSize}).then(res => {
         let moreEntries = res.data;
         if (moreEntries.length <= 8){
           this.isLoadData = false;
         }
         this.entries = [...this.entries, ...moreEntries]
       }).catch(error => console.log("error", error))
     }
    },

    endIntersect(entries, observer, isIntersecting) {
      console.log("isIntersecting",isIntersecting)
      if (isIntersecting && this.entries.length >= 8 && this.isLoadData) {
        this.loadMoreFromApi();
      }

    },


    clearEntries() {
      this.entries = [];
      this.page =1;
      this.pageSize = 9;
    },

    fetchEntriesDebounced(value) {

      clearTimeout(this._searchTimerId);
      this.isLoading = true;

      this._searchTimerId = setTimeout(() => {
        this.fetchEntries(value)
      }, 500)
    },

    fetchEntries(value) {

      if (value === '') {
        this.getDataBeer({page: 1, per_page: 9}).then(res => this.entries = res.data).catch(error => {
          console.log("error", error)
        })
      }
      else {
        this.getDataBeer({beer_name: value, page: 1, per_page: 9}).then(res => {
          return this.entries = res.data
        }).catch(error => {
          console.log("error", error)
        })
        this.isLoading = false;
      }
    },

    querySelections (v) {
      this.isLoading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.entries.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.isLoading = false
      }, 500)
    },
  },


  computed: {

    fields() {
      if (!this.model) return []
      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    },

    items() {
      return this.entries.map(entry => {
        const description = entry.description.length > this.descriptionLimit
            ? entry.description.slice(0, this.descriptionLimit) + '...'
            : entry.description

        return Object.assign({}, entry, {description})
      })
    },

  },



  watch: {
    search(value) {

      console.log("select", this.model?.name)
      console.log("value", value)

      if (this.model?.name === value){
        this.isLoading  = false;
        return ;
      }
        if (!value) {
          this.getDataBeer({page: 1, per_page: 9}).then(res => this.entries = res.data).catch(error => {
            console.log("error", error)
            this.beer_name = ''
          })
        }

        this.isLoadData = true;
        this.beer_name = value;
        this.clearEntries()
        this.isLoading = true
        this.fetchEntriesDebounced(value)
    },
    // entries(newValue, oldValue){
    //   console.log("newValue", newValue);
    //   console.log("oldValue", oldValue);
    // },
    items(newValue, oldValue){
      console.log("newValue", newValue);
      console.log("oldValue", oldValue)
    }


  },
}
</script>