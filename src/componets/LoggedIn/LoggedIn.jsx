import React from 'react'
import { useHistory } from 'react-router'

const LoggedIn = ({user, signedIn, setSignedIn}) => {
    const location = useHistory()
    
    if(signedIn === false) {    //проверка на прохождение входа
        location.push('/')      //перенаправление на страницу входа
    }
   
    return <div style={{width:'fit-content', margin:'40px auto', padding:'20px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', boxShadow:'0 3px 10px grey'}}>
        <h1>{user.data && user.data.name}</h1>  {/* && - чтобы не было проблем когда user пустой*/}
        <h3 style={{marginTop:'0'}}>{user.data && user.data.email}</h3>
        <button style={{outline:'none', fontSize:'20px', borderRadius:'5px'}} onClick={()=>setSignedIn(false)}>LogOut</button>
    </div>
}

export default LoggedIn