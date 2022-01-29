 <template>
  <router-link :to="{ name: 'ListCountries' }">Back</router-link>
  <h1>Country Details</h1>
  <h1>{{ country.name }}</h1>

  <router-link
    :to="{ name: 'DetailCountry', params: { id: bCountry.name } }"
    v-for="bCountry in borderingCountries"
    :key="bCountry.name"
    style="margin-right: 20px"
    >{{ bCountry.name }}</router-link
  >
</template>
 
 <script>
export default {
  name: "DetailCountry",
  props: ["id"],
  data() {
    return {
      country: {},
      borderingCountries: [],
    };
  },
  watch: {
    "$route.params.id": function (id) {
      console.log(id);
      this.callDetailCountryAPI(id);
    },
  },
  mounted() {
    this.callDetailCountryAPI(this.id);
  },
  methods: {
    callDetailCountryAPI(id) {
      
      fetch(`https://restcountries.com/v2/name/${id}?fullText=true`)
        .then((data) => data.json())
        .then((country) => {
          this.country = country[0];
          if (this.country.borders) {
            let borderCountryString = this.country.borders.join(",");
            fetch(
              `https://restcountries.com/v2/alpha?codes=${borderCountryString}`
            )
              .then((data) => data.json())
              .then((countries) => {
                this.borderingCountries = countries.map((country) => {
                  return {
                    name: country.name,
                  };
                });
              });

            console.log(this.country);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
 
 <style>
</style>