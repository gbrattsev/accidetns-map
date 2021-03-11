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
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="login"
              label="Введите логин"
              :rules="[rules.required]"
              name="login"
              required
              outlined
              dense
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="password"
              :rules="[rules.required]"
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

          <v-col
            cols="12"
            md="4"
          >
            <v-btn
              elevation="2"
              @click.prevent="auth"
            >Войти</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <router-link to="/passrestore">Забыли пароль?</router-link>
          </v-col>
          <v-col md="6">
            <router-link to="/registration">Регистрация</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-snackbar
      :timeout="3000"
      :value="snackbar"
      absolute
      bottom
      :dark="true"
      color="red lighten-3"
      outlined
      right
    >
      Пользователь с таким e-mail не найден
    </v-snackbar>
    <v-snackbar
      :timeout="3000"
      :value="snackbar2"
      absolute
      bottom
      :dark="true"
      color="red lighten-3"
      outlined
      right
    >
      Неверный пароль
    </v-snackbar>
    <v-snackbar
      :timeout="3000"
      :value="snackbar3"
      absolute
      bottom
      :dark="true"
      color="red lighten-3"
      outlined
      right
    >
      Авторизация не удалась. Проверьте данные для входа.
    </v-snackbar>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
        login: '',
        password: '',
        show1: false,
        rules: {
          required: value => !!value || 'Поле обязательно для заполнения.',
        },
        snackbar: false,
        snackbar2: false,
        snackbar3: false,
    }
  },
  methods: {
    auth(){
      firebase.auth().signInWithEmailAndPassword(this.login, this.password)
      .then((userCredential) => {
        var user = userCredential.user;
        window.location.replace("/form");
        localStorage.setItem('uid', user.uid);
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        if(errorCode == 'auth/user-not-found'){
          this.snackbar = true;
        } else if(errorCode == 'auth/wrong-password') {
          this.snackbar2 = true;          
        } else {this.snackbar3 = true;}
      });
    }
  },
  mounted(){
  }
}
</script>
