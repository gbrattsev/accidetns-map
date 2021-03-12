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
    <v-form ref="form">
        <h3>Сообщить об аварии</h3>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <VueSuggestions
                :model.sync="city"
                :coordinates.sync="coordinates"
                :placeholder="'Начните вводить'"
                :options="suggestionOptions">
            </VueSuggestions>
          </v-col>
          <v-col
            class="d-flex"
            cols="12"
            sm="6"
            >
            <v-select
            :items="accidents"
            label="Выберите тип аварии"
            v-model="accident"
            outlined
            ></v-select>
            </v-col>
          <v-col
            cols="12"
            md="6"
            >
            <v-textarea
            outlined
            name="message"
            label="Комментарий"
            value=""
            v-model="message"
            ></v-textarea>
        </v-col>
          <v-col
            cols="12"
            md="12"
          >
            <v-btn
              elevation="2"
              @click.prevent="send"
            >Отправить</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import VueSuggestions from 'vue-suggestions';
export default {  
  name: 'Form',
  data(){
    return{
      db: null,
      accident: null,
      message: null,
      rules: {
        required: value => !!value || 'Заполните поле.',
      },
      accidents: [],      
      city: '',
      coordinates: {
        latitude: '',
        longitude: ''
      },
      suggestionOptions: {
        token: 'a74faaad2afdd1de9b7a5f6a730705cbcc05fd4f',
        type: "ADDRESS",
        scrollOnFocus: false,
        triggerSelectOnBlur: true,
        triggerSelectOnEnter: true,
        addon: 'none',
        onSelect (suggestion) {
          if(!suggestion) { 
            console.log('Введите адрес');
          }
        }
      },
    }
  },
  components: { VueSuggestions },
  mounted(){
    
    this.db = firebase.firestore();
    let temp = [];
    this.db.collection("Accident").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          temp.push(doc.data().name);
        });
    });
    this.accidents = temp;
  },
  methods: {
    send(){
      if(!this.coordinates.latitude || !this.coordinates.longitude) {
        console.log('Адрес не найден. Введите ближайший адрес из подсказки');
        return false;
      }
      if(!this.accident) {
        console.log('Выберите тип аварии');
        return false;        
      }
      if(!this.message) {
        console.log('Введите комментарий');
        return false;        
      }
        console.log(this.city);
        console.log(this.coordinates.latitude);
        console.log(this.coordinates.longitude);

      this.db.collection("AccidentsList").doc(this.city).set({
          id_user: localStorage.getItem('uid'),
          comment: this.message,
          adress: this.city,
          latitude: this.coordinates.latitude,
          longitude: this.coordinates.longitude,
          accident: this.accident
        })
        .then(() => {
          window.location.replace("/map");
        })
        .catch((error) => {
          console.error("Ошибка записи в БД: ", error);
        });
    }
  }
}
</script>
