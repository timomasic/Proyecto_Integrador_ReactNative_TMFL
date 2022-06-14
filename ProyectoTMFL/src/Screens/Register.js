import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {auth} from '../firebase/config';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            userName:''
        }
    }
}