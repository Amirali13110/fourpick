import axios from 'axios'

export const aiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})
