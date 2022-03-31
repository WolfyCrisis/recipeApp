import axios from 'axios'

import { BACKEND } from '@env'

export default function axiosConfig() {
    axios.defaults.baseURL = BACKEND
    axios.defaults.timeout = 10000
}