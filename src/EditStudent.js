import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditStudent = () => {
  const{studentid}=useParams()
  // console.log(studentid)
  const[id,setId]=useState("")
  const[name,setName]=useState("")
  const[place,setPlace]=useState("")
  const[phone,setPhone]=useState("")
  const[validation,setValidation]=useState(false)
  const navigate=useNavigate()
  // const[studentData,setStudentdata]=useState({})

  useEffect(()=>{
    fetch("http://localhost:8000/students/"+studentid)
    .then((res)=>res.json())
    .then((data)=>{
      setId(data.id)
      setName(data.name)
      setPlace(data.place)
      setPhone(data.phone)

    })
    .catch((err)=>console.log(err.message))
  },[])
  const handleSubmit=(e)=>{
    e.preventDefault();
    const studentData={id,name,place,phone}
    console.log(studentData);

    fetch("http://localhost:8000/students/"+studentid,{
      method:'PUT',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(studentData)

    })
    .then((res)=>{
      alert("Student Data Updated Successfully")
      navigate("/")
    })
    .catch((err)=>console.log(err.message))
  } 
  
  return (
    <div className='container'>
    <h2>Edit Student Details</h2>

    <form  onSubmit={handleSubmit} >
      <label htmlFor='id'>ID: </label>
      <input type='text' id='id' name='id' onChange={e=>setId(e.target.value)} value={id} required onMouseDown={()=>setValidation(true)} style={{width:'100%'}}/>
      {id.length===0 &&  validation && <span className='errMsg'>Please Enter Your Id </span>}<br/>

      <label htmlFor='name'>Name: </label>
      <input type='text' id='name' name='name' onChange={e=>setName(e.target.value)} value={name} required onMouseDown={()=>setValidation(true)} style={{width:'100%'}}/>
      {name.length===0 &&  validation && <span className='errMsg'>Please Enter Your Name </span>}<br/>


      <label htmlFor='place'>Place: </label>
      <input type='text' id='place' name='place' onChange={e=>setPlace(e.target.value)} value={place} onMouseDown={()=>setValidation(true)} style={{width:'100%'}}/>
      {place.length===0 && validation && <span className='errMsg'>Please Enter Your Place </span>}<br/>


      <label htmlFor='phone'>Phone: </label>
      <input type='text' id='phone' name='phone' onChange={e=>setPhone(e.target.value)} value={phone} onMouseDown={()=>setValidation(true)} style={{width:'100%'}}/>
      {phone.length===0 && validation && <span className='errMsg'>Please Enter Your Phone </span>}<br/>


      <div style={{marginTop:'20px'}}>
        <button className='btn btn-primary'>Update</button>
        <Link to='/' className='btn btn-danger'>Back</Link>        

      </div>

    </form>

    
  </div>
    
  )
}

export default EditStudent
