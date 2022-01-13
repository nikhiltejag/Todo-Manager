import axios from "axios"

const state = {
    todos: []
}

const getters = {
    allTodos: state => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        let response = await axios.get('https://jsonplaceholder.typicode.com/todos')

        commit('setTodos', response.data)
    },
    async addTodo({ commit }, title) {
        let response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        })

        commit('newTodo', response.data)
    },
    async deleteTodo({ commit }, id) {
        let response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

        if (response.status === 200) {
            commit('removeTodo', id)
        }
    },
    async filterTodos({ commit }, event) {
        const limit = event.target.options[event.target.options.selectedIndex].innerText

        let response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
        commit('setTodos', response.data)
    },
    async updateTodo({ commit }, updTodo) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo)
        // console.log(updTodo)

        commit('updateTodo', response.data)
    }
}

const mutations = {
    setTodos: (state, todos) => state.todos = todos,

    newTodo: (state, todo) => state.todos.unshift(todo),

    removeTodo: (state, todoId) => state.todos = state.todos.filter(each => each.id !== todoId),

    updateTodo: (state, updTodo) => state.todos = state.todos.map(each => each.id === updTodo.id ? updTodo : each)
}
export default {
    state,
    getters,
    actions,
    mutations
};