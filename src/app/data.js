import axios from 'axios'

const BASE_URL = "http://localhost:8080/"

export function getMembers() {
    return axios.get(BASE_URL + `members/get-all-members`)
}

export function updateMember(id, data) {
    return axios.put(BASE_URL + `members/update-member/${id}`, data)
}

export function createMember(member) {
    return axios.post(BASE_URL + `members/add-new-member`, member)
}

export function deleteMember(id) {
    return axios.delete(BASE_URL + `members/delete-member/${id}`)
}



