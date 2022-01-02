import React from 'react';
import { Button } from 'antd';

interface LoginState{

}
interface LoginProps{
    
}

class Detail extends React.Component<LoginState,LoginProps>{
    constructor(props: LoginProps){
        super(props);
        this.state = {

        };
    }
    render(){
        return <div>detail</div>
    }
}
export default Detail;