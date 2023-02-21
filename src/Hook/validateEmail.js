import { useEffect, useState } from "react";

const useValidateEmail = (event) =>{

    const [emailOk, setEmailOk] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(()=>{
        
        if(event?.type === 'focus'){
            event.target.parentElement.classList.add('on_focus')
        } else if(event?.type === 'blur'){
            !event.target?.value && event.target.parentElement.classList.remove('on_focus')
            if (!event.target.value) {
                setEmailOk(false);
                setErrorMessage('이메일을 입력해주세요.')
            }
            // if (!emailOk) {
            //     event.target.classList.add('email-false');
            // }
        }
        // if(event?.type === 'change'){
        //     var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        //     // 형식에 맞는 경우 true 리턴
        //     console.log('이메일 유효성 검사 :: ', regExp.test(event.target.value))
        //     const emailCheck = regExp.test(event.target.value);
        //     if(event.target.id === 'email'){
        //         if (!event.target.value) {
        //             setErrorMessage('이메일을 입력해주세요.')
        //         } else if (!emailCheck) {
        //             setEmailOk(false);
        //             setErrorMessage('정확한 이메일을 입력해주세요.')
        //         } else {
        //             setEmailOk(true);
        //         }
        //         setEmailInput(event.target.value);
        //     }else if(event.target.id === 'password'){
        //         if (!event.target.value) {
        //             setErrorMessage('비밀번호를 입력해주세요.')
        //         }
        //         setPasswordInput(event.target.value);
        //     }
        // }
    },[event.type])
    
    return {errorMessage}
}

export default useValidateEmail;