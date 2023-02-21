import React from 'react'
import EmailInput from './EmailInput'

function BannerSection() {
    return (
        <>
            <section className="banner-section">
                <img className="banner" src="https://assets.nflxext.com/ffe/siteui/vlv3/d0a0affb-1c76-4cf0-9d75-eb531f32458c/5a0f4ebb-ab0b-4d6a-b3b7-9f1f45201b63/KR-ko-20221214-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
                <div className="banner-overlay"></div>
                <div className="banner-content">
                    <h1 className="banner-title">영화와 시리즈를 무제한으로.</h1>
                    <h2 className="banner-subtitle">다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</h2>
                    <form action="" className="membership-form">  
                        <EmailInput />
                    </form>
                </div>
            </section>
        </>
    )
}

export default BannerSection