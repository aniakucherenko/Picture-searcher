import Notiflix from 'notiflix';
import axios from 'axios';
axios.get('/users').then(res => {
  console.log(res.data);
});

const API_KEY = '37101968-a8bba96bf4362bcab2ee69f76';
