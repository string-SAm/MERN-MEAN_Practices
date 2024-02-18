import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [data,setData]=useState([])

    const loadData=async()=>{
        const response=await axios.get("loocalhost:3000")
        setData(response.data)
    }

    useEffect(()=>{
        loadData()
    },[])

  return (
    <div style={{marginTop:"150px"}}>
    <table className='styles-table'>
    <thead>
        <tr>
            <th style={{textAlign:'center'}}>ID</th>
            <th style={{textAlign:'center'}}>Name</th>
            <th style={{textAlign:'center'}}>Email</th>
            <th style={{textAlign:'center'}}>Contact</th>
            <th style={{textAlign:'center'}}>Action</th>
        </tr>
    </thead>
    <tbody>
        {data.map((item,index)=>{
            return(
                <tr key={item.id}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>
                        <Link to={`/update/${item.id}`}>
                        <button className='btn btn-edit'>Edit</button>
                        </Link>
                       
                        <button className='btn btn-dlt'>Delete</button>
                        
                        <Link to={`/update/${item.id}`}>
                        <button className='btn btn-view'>View</button>
                        </Link>
                    </td>
                </tr>
            )

        })}
    </tbody>
    </table> 
    </div>
  )
}

export default Home
