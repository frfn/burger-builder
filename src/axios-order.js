import axios from 'axios'

/* variable created so I can EXPORT VARIABLE */
const instance = axios.create({
    baseURL: 'https://react-my-burger-b4a98.firebaseio.com'
})

export default instance;