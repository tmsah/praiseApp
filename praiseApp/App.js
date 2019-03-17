import React, {Component} from 'react';
import {AsyncStorage, View, StyleSheet, Text} from 'react-native';
import FriendsMessageListPanel from './src/FriendsMessageListPanel';
import MyStatePanel from './src/MyStatePanel';
import MyEditorPanel from './src/MyEditorPanel';
import userInfo from './src/userInfo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUsersLoaded: false,
      isMessagesLoaded: false,
      isDataStored: true,
      fromUser: null,
      allUsers: null,
      allMessages: null
  };

  this.initialize()
  this.allMessages=[]
  this.getUsersData('users');
  this.getMessagesData('messages');
}

  initialize() {
    this.clearStorage()
    this.storeData('users', userInfo)
  }
  
  clearStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch (error) {
    }
  }

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
    }
  };

  getUsersData = async (key) => {
    try {
      this.setState({isUsersLoaded:false})
      await AsyncStorage.getItem(key, (err, result) => {
        value=JSON.parse(result)
        this.setState({allUsers: value})
        this.setState({isUsersLoaded: true})
      });
    } catch (error) {
    }
  }

  getMessagesData = async (key) => {
    try {
      this.setState({isMessagesLoaded: false})
      await AsyncStorage.getItem(key, (err, result) => {
        value=JSON.parse(result)
        if (value != null){
          this.allMessages = value
          this.setState({allMessages: this.allMessages})
        }
        this.setState({isMessagesLoaded:true})
      });
    } catch (error) {
    }
  }

  selectFromUser(fromUser){
    this.setState({fromUser})
  }
  sendMessage = async (message, date, toUser) => {
      value = {
        message,
        fromUser: this.state.fromUser,
        toUser,
        clap: {
          num: 0,
          members: []
        },
        date
      }
      this.allMessages.push(value)
      this.storeData('messages', this.allMessages)
      this.setState({allMessages: this.allMessages})
  }
  clapPressed(allUsers){
    this.storeData('users', allUsers)
    this.storeData('messages', this.allMessages)
    this.setState({allUsers})
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isUsersLoaded && this.state.isMessagesLoaded
        ? <View style={styles.container}> 
            <View style={styles.topMergin}/>
            <MyStatePanel style={styles.myState}
              allUsers={this.state.allUsers}
              selectFromUser={this.selectFromUser.bind(this)}/>
            <MyEditorPanel style={styles.myEditor}
              allUsers={this.state.allUsers}
              sendMessage={this.sendMessage.bind(this)}
              fromUser={this.state.fromUser}/>
            <FriendsMessageListPanel style={styles.friendsMessageList}
              allUsers={this.state.allUsers}
              allMessages={this.state.allMessages}
              storeData={this.storeData.bind(this)}
              clapUser={this.state.fromUser}
              clapPressed={this.clapPressed.bind(this)}
            />
          </View>
        :
          <View>
            <Text>loading...</Text>
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderStyle: 'solid',
  },
  topMergin: {
    width: '100%',
    height: '5%',
  },
  myState: {
    width: '100%',
    height: '15%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 2, 
    borderColor: 'gray'
  },
  myEditor: {
    width: '100%',
    height: '20%',
    borderBottomWidth: 2, 
    borderColor: 'gray'
  },
  friendsMessageList: {
    width: '100%',
    height: '60%',
  },
});
