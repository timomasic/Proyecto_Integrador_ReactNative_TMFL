import React, {Component} from 'react';
import { View } from 'react-native';
import { db, auth } from '../firebase/config'


class MainNavigation extends Component {
    constructor(props){
        super(props)
        this.state={
            loggedIn: false,
            registerError:'',
        }
    }

    render() {

        return(
<View>
    <text>
        hola mundo!
    </text>
</View>
        )

    }
}




export default MainNavigation;