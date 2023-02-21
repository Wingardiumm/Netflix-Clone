import { fontSize } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import EmailInput from '../../component/EmailInput'
import faqData from './FaqData'

const FaqContainer = styled.div`
    padding: 7rem 2rem;
    max-width: 900px;
    margin: 0 auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const FaqTitle = styled.h2`
    text-align: center;
    font-size: 2.5rem;
    line-height: 1.8;
`

const AccordionList = styled.div`
    display: flex;
    flex-direction: column;
    margin: 52px auto;
`
const AccordionTitle = styled.div`
    color: white;
  background-color: #303030;
  padding: 25px;
  font-size: 24px;
  position: relative;
  cursor: pointer;
  margin-bottom: 10px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const AccordionSpan = styled.p`
    font-size: 40px;
    height: 100%;
    display: none;
    position: absolute;
    right: 15px;
    top: 3px;
    &.show{
        display: block;  
    }
`
const AccordionAnswer = styled.div`
  color: white;
  background-color: #303030;
  overflow: hidden;
  max-height: 0px;
  padding-left: 25px;
  padding-right: 25px;
  font-size: 24px;
  position: relative;
  top : -8px;
  z-index: 1;
  text-align: left;
  box-sizing: border-box;
  line-height: 1.6;
  transition: all .25s cubic-bezier(.5,0,.1,1);
  &.active {
    max-height: 1200px;
    padding: 25px;
  }
`

function Faq() {
    const data = faqData;

    const [accordionAnswer, setAccordionAnswer] = useState(false);
    const [qnaID, setQnaID] = useState(0);
    const handleQnATitle = (id) => {
        if(accordionAnswer && qnaID===id){
            setAccordionAnswer(false);
            setQnaID(-1);
        }else{
            setQnaID(id);
            setAccordionAnswer(true);
        }
        console.log(id,qnaID)
    }
    

    return (
        <>
            <FaqContainer>
                <FaqTitle>
                    자주 묻는 질문
                </FaqTitle>
                <AccordionList>
                    {
                        data.map((data, i) => (
                            <>
                                <AccordionTitle key={data.id}
                                    onClick={()=>{
                                        handleQnATitle(data.id)
                                    }}>
                                    <p>{data.title}</p>
                                    <AccordionSpan className={`${!(accordionAnswer&&qnaID===data.id)&& 'show'}`}>+</AccordionSpan>
                                    <AccordionSpan style={{right:'20px',top:'5px'}} className={`${accordionAnswer&&qnaID===data.id&& 'show'}`}>x</AccordionSpan>
                                </AccordionTitle>
                                <AccordionAnswer className={`${accordionAnswer&&qnaID===data.id&& 'active'}`}>
                                    {data.content}
                                </AccordionAnswer>
                            </>
                        ))
                    }

                </AccordionList>

                <EmailInput />
            </FaqContainer>
        </>
    )
}

export default Faq