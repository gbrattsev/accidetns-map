<template>  
  <v-app id="inspire">
    <v-container>
      <v-row>
        <v-col        
            cols="12"
            md="4">
          <v-img
            max-height="150"
            contain 
            position='center'
            :src="require('../assets/logo.png')"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-form ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="login"
              label="Введите ФИО"
              :rules="[rules.required]"
              name="login"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="phone"
              label="Введите номер телефона"
              :rules="[rules.required]"
              name="phone"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              type="email"
              label="Введите e-mail"
              :rules="[rules.required, rules.email]"
              name="email"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="emailRepeat"
              type="email"
              label="Повторите e-mail"
              :rules="[rules.required, rules.email, rules.emailCompare]"
              name="emailRepeat"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              :rules="[rules.required, rules.counter]"
              name="password"
              label="Введите пароль"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="passwordRepeat"
              :rules="[rules.required, rules.counter, rules.passCompare]"
              name="passwordRepeat"
              label="Повторите пароль"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="12"
          >
            <v-btn
              elevation="2"
              @click.prevent="reg"
            >Зарегистрироваться</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  
  name: 'Registration',
  data(){
    return{
      login: '',
      phone: '',
      email: '',
      show: false,
      show1: false,
      emailRepeat: '',
      password: '',
      passwordRepeat: '',
      rules: {
        required: value => !!value || 'Заполните поле.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Некорректный e-mail.'
        },
        emailCompare: value => {
          return (this.email == value) || 'Не совпадает e-mail.'
        },
        passCompare: value => {
          return (this.password == value) || 'Пароли отличаются.'
        },
        counter: value => value.length >= 8 || 'Минимум 8 символов',
      },
    }
  },
  methods: {
    reg(){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error)
        // ..
      });
    }
  }
}
</script>
