import React, {Component} from 'react';
import { View } from 'react-native';
import { startClock } from 'react-native-reanimated';
import { db, auth } from '../Firebase/config'


import {NavigationContainer} from '@react-navigation/native';
import  { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Comments from '../Screens/Comments';
import Menu from './Menu';



const Stack = createNativeStackNavigator();

class MainNavigation extends Component {
    constructor(props){
        super(props)
        this.state={
            loggedIn: false,
            registerError:'',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({loggedIn: true})
            }
        })
    }

    

//funcionalidades arrancadas  
    login(mail, pass){
        auth.signInWithEmailAndPassword(mail, pass)
            .then(response => this.setState({
                loggedIn:true
            }))
            .catch( error => console.log(error))

    }
 
    register(mail, pass, userName){
        auth.createUserWithEmailAndPassword(mail, pass)
            .then( responseRegister => {
                console.log(responseRegister); 
                db.collection('users').add({
                            email: mail,
                            userName: userName,
                            createdAt: Date.now(),
                        })
                        .then( res => console.log(res))
                        .catch(error => console.log(error) )

                    })
            .catch( error => {
                console.log(error);
                this.setState({
                     registerError: error.message
                })
            })      
    }
    
    logout(){
        auth.signOut()
            .then( response => this.setState({
                loggedIn: false
            }))
            .catch( error => console.log(error))
    }


    
    
    render() {

        return(
<NavigationContainer>
<Stack.Navigator>
                {
                    this.state.loggedIn ?
                    <Stack.Group> 
                        <Stack.Screen 
                            name='Menu'
                            component ={ Menu }
                            options = {{headerShown: false}}
                            initialParams = {{ logout: ()=> this.logout()}}
                        />
                        {}
                        <Stack.Screen 
                            name='Comentarios'
                            component={ Comments }
                        />
                        {}
                    </Stack.Group> 
                    :
                    <Stack.Group> 
                        <Stack.Screen 
                            name='Login'
                            component = { Login }
                            options = {{headerShown: false}}
                            initialParams = {
                                {   login: (mail, pass)=>this.login(mail, pass),
                                }}
                        />
                        <Stack.Screen 
                            name='Registro'
                            options = {{headerShown: false}}
                            initialParams = { {register: (mail, pass, userName)=>this.register(mail, pass, userName)}}
                            children = {(navigationProps)=><Register errores={this.state.registerError} {...navigationProps}/>}
                        />
                    </Stack.Group>
                }
                </Stack.Navigator>
</NavigationContainer>
        )

    }
}




export default MainNavigation;