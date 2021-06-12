import { createStore } from 'vuex'
const LOC_KEY = 'local_storage'


const state = {
  numbers: [1, 2, 3],
  randomList: wx.getStorageSync(LOC_KEY) || [
    '凉皮肉夹馍',
    '米线',
    '重庆小面',
    '盖饭',
    '蛋炒饭',
    '刀削面',
    '羊杂汤',
    '卤煮',
    '羊肉泡馍',
    '砂锅',
    '养生粥',
    '兰州拉面',
    '油泼面'
  ]
}

const mutations = {
  ADD_NUMBER(state, payload) {
    state.numbers.push(payload)
  },
  UPDATE_LIST(state, payload) {
    wx.setStorageSync(LOC_KEY, payload)
    state.randomList = payload
  }
}

const actions = {
  addNumber(context, number) {
    context.commit('ADD_NUMBER', number)
  },
  updateList(context, list) {
    context.commit('UPDATE_LIST', list)
  }
}

const getters = {
  getNumbers(state) {
    return state.numbers
  },
  randomList(state) {
    return state.randomList
  }
}

const store = createStore({
  state,
  mutations,
  actions,
  getters
})

export default store
