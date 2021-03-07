<template>
  <p>{{info}}</p>
</template>

<script lang="ts">
import {getWelcomePage} from '../api/User'
import { defineComponent } from "vue";
import axios from 'axios';

export default defineComponent({
  name: "Welcome",
  props: {
    msg: String,
  },
  data(){
      return{
          info:null
    }
  },
  mounted(){
     axios.get("http://localhost:3000/api/post/posts").then(response=>{
         this.info = response.data
     })
  }
});

</script>>


<style>

</style>