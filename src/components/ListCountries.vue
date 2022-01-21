<template>
  <section class="filters">
    <input type="text" v-model="searchCountryName" />
    <select v-model="selectedRegion" name="" id="">
      <option value="">Filter By Region</option>
      <option v-for="region in regions" :key="region" :value="region">
        {{ region }}
      </option>
    </select>
  </section>
  <section class="countries-list">
    <div v-for="country in filteredCountries" :key="country.cioc" class="card">
      <img :src="country.flags.png" alt="" class="card__image" />
      <div class="card__content">
        <h1 class="title">
          {{ country.name }}
        </h1>
        <p class="">Population :{{ getFormattedNumber(country.population) }}</p>
        <p class="">Region : {{ country.region }}</p>
        <p class="">Capital :{{ country.capital }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ListCountries",
  data(){
    return{
      countries:[],
      searchCountryName:"",
      selectedRegion: ""
    }
  },
  mounted(){
   fetch(`https://restcountries.com/v2/all`)
                    .then(data=> data.json())
                    .then(countries=>{
                      this.countries = countries
                      console.log(countries)
                    })
                    .catch(err=>console.log(err))
  },
  computed:{
    filteredCountries(){
       if(this.searchCountryName === "" && this.selectedRegion === ""){
        return this.countries
      }
      else if(this.searchCountryName !== "" && this.selectedRegion !== ""){
        return this.countries.filter(country=>{
           if(country.name.toLowerCase().startsWith(this.searchCountryName.toLowerCase()) && country.region === this.selectedRegion){
            return country;
          }
        })
      }
      else{
        if(this.searchCountryName === ""){
            return this.countries.filter(country=>{
           if(country.region === this.selectedRegion){
            return country;
          }
        })
        }
        else{
          return this.countries.filter(country=>{
           if(country.name.toLowerCase().startsWith(this.searchCountryName.toLowerCase())){
            return country;
          }
        })
          }
        }
        
      }
    ,
    regions(){
      let regions = new Set();
      this.countries.forEach(country=>{
        regions.add(country.region)
      })
      return regions
    }
  },
  methods:{
    getFormattedNumber(value){
      return new Intl.NumberFormat().format(value)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.countries-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card__image {
  width: 320px;
  /* width: */
  /* margin: */
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
