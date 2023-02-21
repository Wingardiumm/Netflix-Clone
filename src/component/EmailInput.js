import styled from "styled-components";
import React, { useState } from 'react'

const ErrorMessage = styled.div`
    color: #ffa00a;
    font-size: 15px;
    margin-bottom: -6px;
    padding: 6px 3px;
    text-align: left;
    position: absolute;
`;

function EmailInput() {
    const [emailOk, setEmailOk] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const focusHandler = (event) => {
        console.log(event);
        event.target.parentElement.classList.add('on__focus')
    }
    const blurHandler = (event) => {
        console.log(event);
        !event.target.value && event.target.parentElement.classList.remove('on__focus')
        if (!event.target.value) {
            setEmailOk(false);
            setErrorMessage('이메일을 입력해주세요.')
        }
        if (!emailOk) {
            event.target.classList.add('email-false');
        }
    }
    // 이메일 유효성 검사
    const checkEmail = (e) => {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // 형식에 맞는 경우 true 리턴
        console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))
        const emailCheck = regExp.test(e.target.value);
        if (!e.target.value) {
            setErrorMessage('이메일을 입력해주세요.')
        } else if (!emailCheck) {
            setEmailOk(false);
            setErrorMessage('정확한 이메일을 입력해주세요.')
        } else {
            setEmailOk(true);
        }
    }

    return (
        <>
            <h4 className="form-cta">시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</h4>
            <div className="membership-input-section">
                <div className="membership-input-container">
                    <input
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                        onChange={checkEmail}
                        type="emial" className={`membership-input ${!emailOk && 'email-false'}`} />
                    <label className="membership-placeholder" htmlFor="email">이메일 주소</label>
                    {
                        !emailOk && <ErrorMessage>{errorMessage}</ErrorMessage>
                    }
                </div>
                <div className="membership-btn-container">
                    <button className="membership-btn primary-btn">
                        <span>시작하기</span>
                    </button>
                </div>
            </div>

        </>
    )
}

export default EmailInput