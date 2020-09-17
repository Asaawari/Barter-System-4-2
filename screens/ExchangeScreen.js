import * as React from 'react';
import {Text, View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class ExchangeScreen extends React.Component {
    constructor(){
        super();
        this.state={
            userId : firebase.auth().currentUser.email,
            bookName : '',
            requestReason : ''
        }
    }

    addRequest = (bookName, requestReason) => {
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();
        db.collection('requested_books').add({
            "user_id" : userId,
            "book_name" : bookName,
            "request_reason" : requestReason,
            "request_id" : randomRequestId
        })
        this.setState({
            bookName : '',
            requestReason : ''
        })
    }

    createUniqueId = () => {
        return Math.random().toString(36).substring(7);
    }

    render(){
        return(
            <View>
                <MyHeader title="Request An Item"/>
                <KeyboardAvoidingView style={styles.keyboardStyle}>
                    <TextInput placeholder={"Enter Item Name"} 
                    style={styles.formTextInput}
                    onChangeText={text=>{
                        this.setState({
                            bookName : text
                        })
                    }
                    }
                    value = {this.state.bookName}
                    />
                    <TextInput placeholder={"What can you exchange?"} 
                    style={styles.formTextInput}
                    multiline numberOfLines = {9}
                    onChangeText={text=>{
                        this.setState({
                            requestReason : text
                        })
                    }
                    }
                    value = {this.state.requestReason}                    
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>{}}>
                      <Text>Request</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )