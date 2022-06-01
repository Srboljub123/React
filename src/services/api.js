import isomorphic from 'isomorphic-unfetch'
import axios from 'axios'
import { ENV } from '../../environments'

class Server {
  static async get(path) {
    try {
      const res = await isomorphic(`${ENV.url}${path}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': ENV.apiKey,
        },
      })
      const json = await res.json()
      return { error: false, data: json, message: 'Request success' }
    } catch (e) {
      return { error: true, data: '', message: e.message }
    }
  }
}

export { Server }
