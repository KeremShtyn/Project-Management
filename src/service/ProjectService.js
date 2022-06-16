import Axios from "axios";

const BASE_URL =
    "http://localhost:8082/project";

export default class ProjectService {



    addProject = async (pro) => {
        let data = JSON.stringify(pro);
        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        return Axios.post(BASE_URL + '/addProject', data,{headers}).then(response => response.data).catch(function (error) {
            console.log(error);
            alert(error);
        })
    }

    getAllProjects = async () => {
        let headers ={
            "Accept": "application/json"
        }
        return Axios.get(BASE_URL + "/getAll", {headers}).then(res => res.data).catch(function(error){
            console.log(error);
        });
    }

    getById = async (id) => {
        let headers ={
            "Accept": "application/json"
        }
        return Axios.get(BASE_URL + "/getById" + id, {headers}).then(res => res.data).catch(function(error){
            console.log(error);
        });
    }
    updateProjectbyId(bk, id) {
        let data=JSON.stringify(bk);
        let headers= {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        return Axios.put(`${BASE_URL + "/updateProject"}/${id}`, data ,{headers}).then(res => res.data).catch(function(error){
            console.log(error);
            alert(error);
        });
    }
    deleteProject = async (id) => {
        let headers= {
            "Accept": "application/json"
        }
        return Axios.delete(`${BASE_URL}/${id}`, {headers}).then(res => res.data).catch(function(error){
            console.log(error);
        });
    }
}