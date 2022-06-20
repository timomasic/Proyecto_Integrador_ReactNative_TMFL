import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import {auth, db} from '../Firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
           cantidadDeLikes:this.props.dataPost.data.likes.length,
           myLike:false,
           deletedPostId: this.props.dataPost.data.id,
           url: "",
           id: "",
        }
    }

    componentDidMount(){
        if(this.props.dataPost.data.likes.includes(auth.currentUser.email)){
            this.setState({
                myLike: true,
            })
        }
    }

    like(){
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes + 1,
                myLike: true,
            }))
            .catch(error => console.log(error))

    }

    unLike(){
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes - 1,
                myLike: false
            }))
            .catch(error => console.log(error))
            console.log(this.props.dataPost.data);
    }

    deletePost(deletedPostId) {
        const posteoActualizarEliminado = db
          .collection("posts")
          .doc(this.props.dataPost.id)
          .delete();
      }

    

    render(){
        return(
                <View style={styles.separator}>
                    
                    
                    <Text>Post de: {this.props.dataPost.data.owner}</Text>
                    <Image 
                    style={styles.image}
                    source={require(`${this.props.dataPost.data.url}`)}
                    resizeMode='contain'
                    />
                    <Text>Texto del Post: {this.props.dataPost.data.description}</Text>
                     <Text>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
                    {
                        this.state.myLike ?
                        <TouchableOpacity onPress={()=> this.unLike()}>
                            <Text>Quitar Like</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={()=> this.like()}>
                            <Text>Like</Text>
                        </TouchableOpacity>                
                    }
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Comentarios', { id: this.props.dataPost.id})} > 
                        <Text>Ver comentarios</Text>
                    </TouchableOpacity>   
                    <TouchableOpacity
            style={styles.closeModal}
            onPress={() => {
              this.deletePost(this.props.dataPost.data.id);
            }}
          >
            <Ionicons name="trash" size="15px" color="red" />
          </TouchableOpacity>
                    
                </View>
        )
    }

}

const styles = StyleSheet.create({
    separator:{
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal:20
    },
    image:{
        height: 400,
    },
})

export default Post;