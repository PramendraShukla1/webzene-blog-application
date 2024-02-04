import React from 'react'
import "../style/Carousal.css"
import img from "../assets/hero_blog.png"

const Carousal = () => {
    
  return (
    <div className="container col-xxl-8 px-4 py-5 ">
    <div className="row flex-lg-row-reverse align-items-center flex justify-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img
          src={img}
          className="d-block mx-lg-auto img-fluid h-auto w-auto"
          alt="Bootstrap Themes"
          width={500}
          height={300}
          loading="lazy"
        />
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1">
        Unveiling the Power of Words: Your Journey into the Blogosphere Begins Here
        </h1>
        <p className="lead mt-4">
        Webzine-Blogging Services, the innovative platform that has revolutionized the way we share and consume content online, is the brainchild of Intellectic Pvt. Ltd. This cutting-edge service seamlessly blends the worlds of webzines and blogs, offering users a unique and dynamic platform to express their thoughts, insights, and creativity.
        </p>
       
      </div>
    </div>
  </div>
  

  )
}

export default Carousal