import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ScrollView
} from 'react-native';
import { db, auth } from '../Firebase/config';
import Post from './Post';


class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            username: '',
            posts: []
        }
    }

    componentDidMount() {
        db.collection("posts")
            .where("owner", "==", auth.currentUser.email)
            .onSnapshot(
                (docs) => {
                    let posts = [];
                    docs.forEach((doc) => {
                        posts.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    }); 
                    this.setState({
                        posts: posts,
                        loader: false,
                    });
                    console.log(posts);
                }
            )
        db.collection("users")
            .where("email", "==", auth.currentUser.email)
            .onSnapshot(
                (docs) => {
                    let posts = [];
                    docs.forEach((doc) => {
                        posts.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    }); 
                    console.log(posts)
                    this.setState({
                        username: posts[0].data.username,
                        loader: false,
                    });
                    ;
                }
            );
    }


    render(){
        console.log(this.props);
        return(
            <ScrollView>
                <View>
                    <Text> Perfil</Text>


                    <Text>
                        <Text>
                            {auth.currentUser.email} 
                        </Text>
                    </Text>

                    <Text>
                        <Text>
                            Última fecha de ingreso:
                        </Text>
                        <Text>
                            {auth.currentUser.metadata.lastSignInTime}
                        </Text>
                    </Text>

                    <Text>
                        <Text>Publicaciones:</Text>
                        <Text>
                            {this.state.posts.length}
                        </Text>
                    </Text>


                    {this.state.posts.length > 0 ? (
                        <FlatList
                            style={styles.separator}
                            data={this.state.posts}
                            style={styles.flatlist}
                            keyExtractor={(post) => post.id.toString()}
                            renderItem={({ item }) => <Post dataPost={item} {...this.props} />}
                        />
                    ) : (
                        <View>
                            <Text>
                                No tenés niguna publicación.
                            </Text>
                        </View>
                    )}
                
                    <TouchableOpacity onPress={()=>this.props.route.params.logout()}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    separator:{
        backgroundColor: 'grey',
        borderBottomColor: "black",
        borderBottomWidth: 5,
        borderTopColor: "black",
        borderTopWidth: 5,
        rowGap: 9,
        alignItems: "center",
        },
});

export default Profile;