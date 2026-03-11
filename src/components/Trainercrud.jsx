import axios from "axios";
import { useEffect, useState } from "react";

function Trainercrud(){
   

    const [trainers,setTrainers]=useState([]);
    const [name,setName]=useState("");
    const [mobile,setMobile]=useState("");
    const [email,setEmail]=useState("");
    const[technologies,setTech]=useState("");
    const [id,setEditId]=useState(null);
   
    const API="https://localhost:7090/api/Trainers";

    // Retrive Trainer Data 

    useEffect(()=>{
        fetchTrainers();
    },[]);

    const fetchTrainers=async()=>{
        const res=await axios.get(API);
        
        setTrainers(res.data);
    }

    //Add Trainers details 

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const newTrainer={name,mobile,email,technologies};
            console.log("Updated id :",id);
            console.log("Data",newTrainer);
            if(id){
                await axios.put(`${API}/${id}`,newTrainer);
                    console.log(newTrainer);
                    setTrainers(
                        
                        trainers.map((t)=>
                            t.id===id? {...t,name,mobile,email,technologies}:t
                        )
                    );
                    setTrainers(null);
            }
            else
            {
                const res=await axios.post(API,newTrainer);
                setTrainers([...trainers,res.data]);
            }
            setName("");
            setMobile("");
            setEmail("");
            setTech("");
        } catch (error) {
            alert("Error in updation ",error);
        }
    };

    //Delete trainers 

    const handleDelete =async (id)=>{
        console.log("Deleted id",id);

       try {
         await axios.delete(`${API}/${id}`);
         setTrainers(trainers.filter((t)=>t.id!==id));
         alert("Deleted Record")
       } catch (error) {
        console.error("Delete Error : ",error);
        alert("error in deleting ");
       }
    }

    // Edit trainer
    const handleEdit= (trainers)=>{
        setName(trainers.name);
        setMobile(trainers.mobile);
        setEmail(trainers.email);
        setTech(trainers.technologies);
        setEditId(trainers.id);
    };

    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">Trainer Management</h3>

            <div className="card p-3 mb-4">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <input 
                            className="form-control"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                            />
                        </div>

                        <div className="col-md-4">
                            <input 
                            className="form-control"
                            placeholder="Enter Mobile"
                            value={mobile}
                            onChange={(e)=>setMobile(e.target.value)}
                            required
                            />
                        </div>


                        <div className="col-md-4">
                            <input 
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            />
                        </div>

                        <div className="col-md-4">
                            <input 
                            className="form-control"
                            placeholder="Enter Technologies"
                            value={technologies}
                            onChange={(e)=>setTech(e.target.value)}
                          
                            />
                        </div>

                         <div className="col-md-4">
                           <button className="btn btn-primary w-100">
                            {id? "Update Trainer":"Add Trainer"}
                           </button>
                        </div>

                    </div>
                </form>
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Mobile </th>
                    <th>Email </th>
                    <th>Technologies</th>
                    <th width="200">Action</th>
                </tr>
                </thead>
                <tbody>
                    {

                        trainers.map((t)=>(
                            <tr key={t.id}>
                                <td>{t.id}</td>
                                <td>{t.name}</td>
                                <td>{t.mobile}</td>
                                <td>{t.email}</td>
                                <td>{t.technologies}</td>
                                <td>
                                    <button 
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={()=>handleEdit(t)}
                                    >Edit </button>
                                    <button 
                                    className="btn btn-danger btn-sm me-2"
                                    onClick={()=>handleDelete(t.id)}
                                    >Delete </button>


                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
          

        </div>

    );

}
export default Trainercrud;

