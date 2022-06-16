import React, { useState, useEffect,useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ProjectService from '../../src/service/ProjectService';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { useHistory } from 'react-router-dom';
import { confirmPopup } from 'primereact/confirmpopup';
 


const TableDemo = () => {

    const [proj, setProj] = useState(new Array());
    const [project, setProject] = useState([]);
    const [selectedProject, setSelectedProject] = useState(project);
    const [updateProject, setUpdateProject] = useState(null);
    const [id, setId] = useState("");
    const [checkboxValue, setCheckboxValue] = useState(selectedProject.active);
    let [visible,setVisible] = useState(false);
    const history = useHistory();




    let projectService = new ProjectService();

    async function getAll() {
        setProject(await projectService.getAllProjects());
    }

    async function getById() {
        setUpdateProject(await projectService.getById(id));
    }




    useEffect(() => {

        getAll();
        setVisible(false);
    }, []);
    useEffect(() => {

        getAll();
        setVisible(false);
    }, [proj]);
    
    



    const activeBody = (rowData) => {
        let value = rowData.active;
        return <span className='customer-badge'>{value ? "active" : "not active"}</span>
    }
    function deleteProjectById(event, id) {
        projectService.deleteProject(id)
            .then(pro => {
                setProj(pro);
                setProject([...project].filter(pro => pro.id !== id));
                alert("project deleted.")
                getAll();
            }).catch((err)=>{
                console.log(err+'Failed')
            });
    }

    function updateProjectById(event, id) {
        projectService.updateProjectbyId({ ...selectedProject }, id)
            .then(pro => {
                setUpdateProject(pro);
                setProj([...proj]);
                console.log(pro.statusText);
                setVisible(false);
                alert("project updated.")
            }).catch((err)=>{
                console.log(err+'Failed')
            });
    }

    const deleteItem = (rowData) => {

        return <i onClick={(event)=> confirm(event,rowData.id)}  className='pi pi-trash' style={{'fontSize' : "1.6em" , "color": "red"}} ></i>
    }

    const confirm = (event,id) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to delete Project?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => acceptFunc(event,id),
            reject: () => rejectFunc()
        });
    }

    function acceptFunc(event,id){
        deleteProjectById(event, id)
    }
    function rejectFunc(){
        return null;
    }
    


    const updatededProject = (rowData) => {

        return <Button onClick={() => { setSelectedProject(rowData); setId(rowData.id); setCheckboxValue(rowData.active); setVisible(p=> !p) }} label='Update' className='mr-2 mb-2'></Button>
    }


    

    function handleInputChange(event) {
        const { name, value } = event.target;
        console.log(value)
        let newProject = { ...selectedProject };
        if (name == "active") {
            setCheckboxValue(o => !o);
            newProject["active"] = !checkboxValue;
        }
        else {
            newProject[name] = value;
        }


        setSelectedProject(newProject);

    }

    return (
        <div className="grid justify-content-center align-items-center">
            {visible && <div className="col-12 md:col-4">
                <div className="card p-fluid">
                    <div className='updateProjectHeader'>
                    <h5>Update Project</h5>
                    <i className='p-button-icon p-c pi pi-times' onClick={()=> setVisible(false)} />
                    </div>
                    <div className="projectName">
                        <label className='col-fixed w-9rem' htmlFor="projectName">Project Name</label>
                        <InputText id="projectName" name='projectName'
                            type="text"
                            value={selectedProject.projectName}
                            onChange={(event) => handleInputChange(event)}
                        />
                       
                    </div>
                    <div className="startDate">
                        <label className='col-fixed w-9rem' htmlFor="startDate">Start Date</label>
                        
                        <InputText className='p-inputtext' name='startDate' value={selectedProject.startDate}
                            type="date" id="startDate"
                            onChange={(event) => handleInputChange(event)} />
                    </div>
                    <div className="endDate">
                        <label className='col-fixed w-9rem' htmlFor="endDate">End Date</label>
                        <InputText className='p-inputtext' name='endDate' type="date" id='endDate' value={selectedProject.endDate} onChange={(event) => handleInputChange(event)} ></InputText>
                    </div>
                    <div className="offer">
                        <label htmlFor="offer">Offer</label>
                        <InputText name='offer' id='offer' value={selectedProject.offer} onChange={(event) => handleInputChange(event)} ></InputText>
                    </div>
                    <div className="status">

                        <div className="grid">
                            <div className="col-12 md:col-4 mt-2">
                                <div className="field-checkbox  ">
                                    <Checkbox  id='active' name="active" onChange={(event) => handleInputChange(event)} checked={checkboxValue}></Checkbox>
                                    <label className='col-fixed w-9rem' htmlFor="offer">Active</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='addButtonDiv'>
                        <Button onClick={(event) => updateProjectById(event, id)} className='project-button'>
                            Update
                        </Button>

                    </div>
                </div>
                
            </div>}
            <div className="card">
                    <h5>Project List</h5>
                    <DataTable value={project} paginator className="p-datatable-gridlines" showGridlines rows={10}
                        dataKey="id" filterDisplay="menu" responsiveLayout="scroll"
                        emptyMessage="No Project found.">
                        <Column field="projectName" header="Name" filter filterPlaceholder="Search by Project Name" style={{ minWidth: '12rem' }} sortable />
                        <Column field="startDate" header="Start Date" style={{ minWidth: '12rem' }} filter filterPlaceholder="Search by Start Date" sortable
                        />
                        <Column field="endDate" filterPlaceholder="Search by End Date" header="End Date" filterField="endDate" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                            filter sortable />
                        <Column field="offer" filterPlaceholder="Search by Offer" header="Offer" filterField="offer" dataType="date" style={{ minWidth: '10rem' }}
                            filter sortable />
                        <Column data body={activeBody} field="active" header="Status" filterPlaceholder="Search by Is Active" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} filter sortable />
                        <div body={updatededProject} filter />
                        <div body={deleteItem} filter ></div>
                        
                    </DataTable>
                    <div align="right" >
                        <Button onClick={() => { history.push('/uikit/formlayout') }} label='Add Project' className='mr-2 mb-2'></Button>
                    </div>
                </div>

        </div>

    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(TableDemo, comparisonFn);
