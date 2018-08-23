import {
  URL_CHANGE,
} from './mutation-types.js'

export default {
  [URL_CHANGE] (state, url) {
    state.curRouter = url
  },
}
