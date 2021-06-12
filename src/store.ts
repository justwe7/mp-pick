import { createStore } from 'vuex'

const state = {
  numbers: [1, 2, 3],
  randomList: [
    '北京烤鸭',
    '特色小龙虾',
    '串串香',
    '肉夹馍',
    '牛羊肉泡馍',
    '麻辣凉皮',
    '汉中热米皮',
    '肉丸糊辣汤',
    '水盆羊肉',
    '凉皮',
    '乾县锅盔',
    '辣子锅盔',
    '葫芦头泡馍',
    '金线油塔'
  ]
}

const mutations = {
  ADD_NUMBER(state, payload) {
    state.numbers.push(payload)
  },
  UPDATE_LIST(state, payload) {
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
