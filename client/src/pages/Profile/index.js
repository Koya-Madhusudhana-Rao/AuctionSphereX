import React from 'react'
import { Tabs} from 'antd';
import Products from './Products';
import { useSelector } from 'react-redux';
import moment from 'moment';
import './general.css'
import UserBids from './UserBids'

function Profile() {
    const {user} = useSelector((state) => state.users);
  return (
    <div>
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Products" key="1">
                <Products />
            </Tabs.TabPane>
            <Tabs.TabPane tab="My Bids" key="2">
                <UserBids/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="General" key="3">
                    <div className='user-details'>
                        <div className='detail-row'>
                            <span className='label'>Name:</span>
                            <span className='value'>{user.name}</span>
                        </div>
                        <div className='detail-row'>
                            <span className='label'>Email:</span>
                            <span className='value'>{user.email}</span>
                        </div>
                        {/* <div className='detail-row'>
                            <span className='label'>mobile:</span>
                            <span className='value'>{user.mobile}</span>
                        </div> */}
                        <div className='detail-row'>
                            <span className='label'>Created At:</span>
                            <span className='value'>{moment(user.createdAt).format("MMM D, YYYY hh:mm A")}</span>
                        </div>
                    </div>
                </Tabs.TabPane>
        </Tabs>
    </div>
  )
}

export default Profile