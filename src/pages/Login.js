
import { Form, Password, message } from 'antd'
import {useState, useEffect}from 'react'
import { Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../resources/auth.css";
import axios from "axios";
import Spinner from "../components/Spinner";


export default function Login(){
    const [loading, setLoading]=useState(false)
    const navigate = useNavigate()

    const onFinish= async (values)=>{
      try {
        setLoading(true)
        const response = await axios.post("/api/users/login", values);
        localStorage.setItem("BOYF-user",JSON.stringify({ ...response.data, password: "" }));
        setLoading(false)
        message.success("Thanks for Loging in!")
        navigate("/")
      } catch (error) {
        setLoading(false)
        message.error("Something went wrong!")
        
      }
    }
    useEffect(() => {
      if (localStorage.getItem("BOYF-user")) {
        navigate("/");
      }
    }, []);

  return (
    <div className="register">
    {loading && <Spinner />}
    <div className="row justify-content-center align-items-center w-100 h-100">
      <div className="col-md-4">
        <Form layout="vertical" onFinish={onFinish}>
          <h1>Login</h1>
  

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password className='password'/>
          </Form.Item>

          <div className="d-flex justify-content-between align-items-center">
            <Link to="/register">
              Not Registered Yet? Click Here To Register
            </Link>
            <button className="secondary" type="submit">
              LOGIN
            </button>
          </div>
        </Form>
      </div>
      <div className="col-md-5">
        <div className="lottie">
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  </div>
);
}


