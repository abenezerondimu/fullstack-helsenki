import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (phonebookObject) => {
  return axios.post(baseUrl, phonebookObject).then((response) => response.data);
};
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};
const update = (id, changedObject) => {
  return axios
    .put(`${baseUrl}/${id}`, changedObject)
    .then((response) => response.data);
};

export default { getAll, create, remove, update };
