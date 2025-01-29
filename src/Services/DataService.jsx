import http from "./http-common"

class DataService {
  getAll() {
    return http.get("/library/Users");
  }

  get(id) {
    return http.get(`/library/Users/id?id=${id}`);
  }

  create(data) {
    return http.post("/library/Users", data);
  }

  update(id, data) {
    return http.put(`/library/Users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/library/Users/${id}`);
  }

  deleteAll() {
    return http.delete(`/library/Users`);
  }

  findByName(name) {
    return http.get(`/library/Users/name?name=${name}`);
  }
}

export default new DataService();