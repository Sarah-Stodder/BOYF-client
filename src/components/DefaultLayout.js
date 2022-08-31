import React from 'react'
import { Menu, Dropdown, Button, Space } from "antd";
import {useNavigate} from 'react-router-dom'

import "../resources/default-layout.css"
export default function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("BOYF-user"));
  const navigate = useNavigate()
  const menu = (
    <Menu
      items={[
        {
          label: (
            <li onClick={()=>{
              localStorage.removeItem('BOYF-user')
              navigate("/login");
            }}>Logout</li>
          ),
        }
      ]}
    />
  )
  return (
    <div className="layout">
        <div className="header">
        <nav className="navbar bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="https://res.cloudinary.com/dxfkurrkj/image/upload/v1661405581/logo_1_zpcklg.jpg" alt="" width="" height="50px" className="d-inline-block align-text-top"/>
        </a>
        <li className="nav-item">
          <a className="nav-link" href="/">Home</a>
        </li>
      <li className="nav-item">
          <a className="nav-link" href="/piggy-bank">PiggyBank</a>
        </li>
        <li>
            <Dropdown overlay={menu} placement="bottomLeft">
            <button className='primary'>{user.name}</button>
          </Dropdown>
          </li>
      </div>
            
    </nav>

        </div>
        <div className="content">
            {props.children}
        </div>
    </div>
  )
}
