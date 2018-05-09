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
    SectionList
} from 'react-native';
import Post from './src/components/Post';

const width = Dimensions.get('screen').width;

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            fotos: [],
            status: ''
        }
    }

    componentDidMount() {
        fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
        .then(res => res.json())
        .then(json => this.setState({fotos: json}))
        .catch(e => {
            this.setState({status: 'Erro ao carregar as informações'})
        })
    }

    render() {
        return (
            <View>
                <FlatList
                    keyExtractor={(item) => String(item.id)}
                    data={this.state.fotos}
                    renderItem={ ({item}) =>
                        <Post foto={item}/>
                    }
                />
                <View>
                    <Text style={{color: 'red'}}>{this.props.status}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
