/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Icon } from 'react-native-vector-icons/FontAwesome';

const myIcon = (<Icon name='favorite-border' size={30} color="#000"/>);
const width = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto
        }
    }

    like() {
        const { foto } = this.state;

        let novaLista = [];
        if (!this.state.foto.liked) {
            //Similar ao concat
            novaLista = [
                ...foto.likers,
                {login: 'meuUsuario'}
            ]       
        } else {
            novaLista = foto.likers.filter(liker => {
                return liker.login !== 'meuUsuario';
            })
        }

        const fotoUpdated = {
            ...foto,
            liked: !foto.liked,
            likers: novaLista,
        }

        this.setState({foto: fotoUpdated}) 
    }

    loadIcon(liked) {
        return !liked ? require('../../resources/like.png') : require('../../resources/liked.png');
    }

    showLikes(likers) {
        return likers.length > 0 && 
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>  

        // Traditional mode
        // if (likers.length > 0) {
        //     return (
        //         <Text style={styles.likes}>
        //             {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
        //         </Text>
        //     );      
        // } 
    }

    showComments(foto) {
        //After drop this line
        foto.comentarios = [{ id: 1, texto: 'Teste de comentário', login: 'rafael' }];

        return foto.comentario !== '' &&
            <View style={styles.comments}>
                <Text style={styles.titleComment}>{foto.loginUsuario}</Text>
                <Text>{foto.comentario}</Text>
            </View>

        // Traditional mode
        // if (foto.comentario !== '') {
        //     return (
        //         <View style={styles.comments}>
        //             <Text style={styles.titleComment}>{foto.loginUsuario}</Text>
        //             <Text>{foto.comentario}</Text>
        //         </View>
        //     );
        // }
    }

    render() {
        const { foto } = this.state;
        return (
            <View>
                <View style={styles.profileContainer}>
                    <Image source={{uri: this.props.foto.urlPerfil}}
                        style={styles.profileImage}/>
                    <Text style={styles.userName}>
                        {foto.loginUsuario}
                    </Text>
                    <Text style={{marginLeft: 10}}>
                        postado em {foto.horario}
                    </Text>
                </View>
            
                <Image source={{uri: foto.urlFoto}}
                        style={styles.postImage}/>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.like.bind(this)}>
                        <Image source={this.loadIcon(foto.liked)} 
                                style={styles.likeButton}/>
                    </TouchableOpacity>

                    {this.showLikes(foto.likers)}
                    {this.showComments(foto)}
                    
                    {foto.comentarios.map(comentario =>
                       <View style={styles.comments} key={comentario.id}>
                           <Text style={styles.titleComment}>{comentario.login}</Text>
                           <Text>{comentario.texto}</Text>
                       </View> 
                    )}

                    <TextInput></TextInput>
                </View>
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    profileImage: {
        width: 40, 
        height: 40, 
        borderRadius: 50
    },
    postImage: {
        width: width, 
        height: width
    },
    profileContainer: {
        margin: 10, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    userName: {
        color: 'black',
        marginLeft: 10
    },
    likeButton: {
        marginBottom: 10,
        height: 40,
        width: 40
    },
    footer: {
        margin: 10
    },
    likes: {
        fontWeight: 'bold'
    },
    comments: {
        flexDirection: 'row'
    },
    titleComment: {
        marginRight: 5,
        fontWeight: 'bold'
    }
});
