import {initMovieReq,moreMoiveReq} from 'Api'
export default {
  namespaced: true,
  state: {
    movieIds: [],
    movies: []
  },
  actions: {
    async getInitMovies ({commit}) {
      commit({
        type: 'GET_INIT_MOVIES',
        payload: await initMovieReq()
      })
    },
    async getMoreMovies ({commit},payload) {
      commit({
        type: 'GET_MORE_MOVIES',
        payload: await moreMoiveReq(payload)
      })
    }
  },
  mutations: {
    GET_INIT_MOVIES (state,{payload:{movieList,movieIds}}) {
      state.movies = movieList
      state.movieIds = movieIds
    },
    GET_MORE_MOVIES (state,{payload:{coming}}) {
      state.movies.push(...coming)
    }
  }
}