import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
        }
    }


    render(){

        return(
                <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text})}
                />
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text})}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.props.route.params.login(this.state.email, this.state.password)}>
                    <Text style={ styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>   
                 <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Registro') }>
                        <Text>No tengo cuenta</Text>
                 </TouchableOpacity>
            
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:15,
        marginTop: 115
    },
    title:{
        marginBottom:15
    },
    field:{
        borderColor:  '#F0F8FF' ,
        borderWidth: 1,
        borderRadius: 1,
        padding:3,
        marginBottom:10

    },
    button: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'Blue',
    },
    buttonText:{
        color: '#fff'
    }
})


export default Login;