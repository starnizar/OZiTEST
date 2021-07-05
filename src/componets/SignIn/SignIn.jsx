import React, { useRef } from 'react'
import { useHistory } from 'react-router'


const SignIn = ({setUser, setSignedIn}) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const location = useHistory()
    //регулярка для валидации почты (позаимствовал)
    const mailRegexp = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/

    // функция для нахождения информации пользователя
    const getUserData = async (token) => {
        const response = await fetch('https://tager.dev.ozitag.com/api/tager/user/profile', {//запрос на сервер о пользователе с таким токеном
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        const result = await response.json()//преобразуем ответ из JSON в объект
        setSignedIn(true)   //записываем в state true чтобы подтвердить вход
        setUser(result)     //записываем в state данные пользователя
        location.push('/loggedin') //переход на страницу пользователя
    }

    const logIn = async (event) => {
        event.preventDefault()//предотвращение перезагрузки страницы после отправки формы
        if(!mailRegexp.test(emailRef.current.value) || emailRef.current.value.trim() === ''){   // проверка поля на пустое значение и правильность заполнения
            return alert('Ваша почта недействительна!')
        }
        if(passwordRef.current.value.trim() === ''){    //проверка на пустое поле
            return alert('Пароль не может отсутсвовать или состоять из пробелов!')
        }
        const data = {  //объект который будет преобразован в JSON-формат и передан на сервер
            clientId:1, //не понимаю зачем это свойство, но пусть лучше будет
            email:emailRef.current.value,      //почта из инпута с почтой
            password:passwordRef.current.value //пароль из инпута с паролем
        }
        const response = await fetch('https://tager.dev.ozitag.com/api/auth/user', { // отправляем на сервер информацию из формы
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
        })
        if(!response.ok){ //проверка ответа на ошибку
            return alert('Неверное имя пользователя или пароль!')
        }
        const result = await response.json()//если ответ ок, преобразуем ответ из JSON в объект
        getUserData(result.data.accessToken)//и передаём accessToken в функцию для полученяи информации о пользователе
    }

    return <form onSubmit={logIn} style={{width:'fit-content', margin:'40px auto', padding:'10px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', boxShadow:'0 3px 10px grey'}}> {/* стилей немного, поэтому инлайново(сори за длинную строку, хотя бывает и хуже:) */}
        <input style={{padding:'10px 20px', fontSize:'20px', outline:'none', borderRadius:'5px'}} ref={emailRef} type="mail" placeholder='example@exail.ex'/>
        <p>user@ozitag.com</p>
        <input style={{padding:'10px 20px', fontSize:'20px', outline:'none', borderRadius:'5px'}} ref={passwordRef} type="password" placeholder='Password'/>
        <p>user</p>
        <button style={{outline:'none', fontSize:'20px', borderRadius:'5px'}}>SignIn</button>
    </form>
}

export default SignIn