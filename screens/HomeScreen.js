import * as React from 'react';
import {Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {
    constructor(){
        super();
        this.state={
            requestedList : []
        }
        this.requestRef = null;
    }

    getRequestedList=()=>{
        this.requestRef = db.collection("requested")
        .onSnapshot((snapshot)=>{
            var requestsList = snapshot.docs.map(document=>document.data());
            this.setState({
                requestedList : requestsList
            })
        })
    }

    componentDidMount(){
        this.getRequestedList()
    }

    componentWillUnmount(){

    }

    keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Home Screen"/>
        <View style={{flex:1}}>
          {
            this.state.requestedList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requests</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBooksList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})