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
            <v-text-field
              v-model="address"
              label="Введите адрес аварии"
              :rules="[rules.required]"
              name="address"
              required
              outlined
              dense
            ></v-text-field>
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
// import firebase from 'firebase'
export default {
  
  name: 'Form',
  data(){
    return{
      address: null,
      accident: null,
      message: null,
      rules: {
        required: value => !!value || 'Заполните поле.',
      },
      accidents: [
          'Яма',
          'Прорыв трубы',
          'Неубранный снег'
      ]
    }
  },
  methods: {
    send(){
        console.log(this.address);
        console.log(this.accident);
        console.log(this.message);
    }
  }
}
</script>
