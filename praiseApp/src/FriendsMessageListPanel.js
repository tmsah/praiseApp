import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import FriendsMessagePanel from './FriendsMessagePanel';

export default class FriendsMessageListPanel extends Component {
    render(){
        messageList = this.props.allMessages
        //this.props.storeData('messages', messageList)
        showMessages=[];
        if(messageList != null){
            for (let i = 0; i < messageList.length; i++) {
                k = messageList.length - i - 1
                showMessages.push(
                    <View style={styles.friendsMessage}>
                            <FriendsMessagePanel 
                                messageProperty = {messageList[k]}
                                allUsers={this.props.allUsers}
                                clapUser = {this.props.clapUser}
                                clapPressed = {this.props.clapPressed.bind(this)}/>
                    </View>
                );
            }
        }
        return (
            <View style={this.props.style}>
                <ScrollView>
                    {showMessages}
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    friendsMessage: {
        width: '100%',
        height: 235,
        backgroundColor: '#F5FCFF',  
      } 
  });