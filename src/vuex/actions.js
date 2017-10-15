//updateCluster
export const updateCluster = ({commit}) => {
    commit('updateCluster')
}
//updateBaseInfo
export const updateBaseInfo = ({commit}) => {
    commit('updateBaseInfo')
}
//createSocket
export const createSocket = ({commit}) => {
    commit('createSocket')
}
//closeSocket
export const closeSocket = ({commit}) => {
    commit('closeSocket')
}
//updateCount
export const updateCount = ({commit},status) => {
    commit('updateCount',status)
}
//setState
export const setState = ({commit},options) => {
    commit('setState',options)
}