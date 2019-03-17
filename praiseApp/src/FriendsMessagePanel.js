import React, {Component} from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class FriendsMessagePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            modalVisible: false,
            isClappable: true,
            showClapMembers: '',
        }
    };

    openModal() {
        this.setState({modalVisible: true})
    }
    closeModal() {
        this.setState({modalVisible: false})
    }

    onPressClapButton() {
        clapMembers = this.props.messageProperty.clap.members
        find=false
        for (let i in clapMembers) {
            if(clapMembers[i].name == this.props.clapUser){
                clapMembers[i].count++
                find=true
            }
        }
        if(!find){
            clapMembers.push({name: this.props.clapUser, count: 1})
        }
        this.props.messageProperty.clap.num++
        this.props.messageProperty.clap.members = clapMembers
        this.findUser(this.props.clapUser).clappable-=2
        this.findUser(this.props.messageProperty.toUser).clapped++
        this.props.clapPressed(this.props.allUsers)
    }

    findUser(key) {
        for(let i in this.props.allUsers){
            if(this.props.allUsers[i].name == key){
                return this.props.allUsers[i]
            }
        }
        return null
    }

    showClapMembers() {
        clapMembers = this.props.messageProperty.clap.members
        result=''
        if(clapMembers.length != 0){
            clapMembers.sort(function (a, b) {
                return b.count - a.count;
              });
            for (let i in clapMembers) {
                  result += clapMembers[i].name + ' : ' + clapMembers[i].count + '\n'
              }
            result = '拍手した人\n'+result
        }
        else{result = '拍手されていません'}
        this.setState({showClapMembers: result})
        this.setState({modalVisible: true})
    }

    checkClappable(clapUser) {
        if(clapUser != null){
            if(clapUser.clappable >= 2
                && clapUser.name != this.props.messageProperty.fromUser 
                    && clapUser.name != this.props.messageProperty.toUser){
                if(this.props.messageProperty != null){
                    clapMembers = this.props.messageProperty.clap.members
                    for (let i in clapMembers) {
                        if(clapMembers[i].name == clapUser.name){
                            if(clapMembers[i].count >= 15){
                                return false
                            }        
                        }
                    }
                    return true
                }
            }
        }
        return false
    }

    render(){
        messageProperty = this.props.messageProperty
        clapUser = this.findUser(this.props.clapUser)
        isClappable = this.checkClappable(clapUser)
        fromUser = this.findUser(messageProperty.fromUser)
        toUser = this.findUser(messageProperty.toUser)
        return (
            <View style={styles.friendsMessage}>
            <Modal
                visible={this.state.modalVisible}
                transparent='false'
                animationType={'slide'}>
                <View style={styles.container}>
                    <View style={styles.clapMembers}>
                        <Text style={{fontSize: 19}}>{this.state.showClapMembers}</Text>
                    </View>
                </View>
            </Modal>
                <View style={styles.praiseFromTo}>
                    <Image
                        style={styles.image}
                        source={fromUser.image}/>
                    <Text>{fromUser.name}</Text>
                    <Text style={styles.arrow}>→</Text>
                    <Image
                        style={styles.image}
                        source={toUser.image}/>
                    <Text>{toUser.name}</Text>
                </View>
                <View style={styles.message}>
                    <Text>{messageProperty.message}</Text>
                </View>
                <View style={styles.messageStatus}>
                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.button}
                            disabled={!isClappable}
                            onPress={()=>{{this.onPressClapButton()}}}>
                            <Text style={{color: 'lightskyblue'}}>拍手!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onLongPress={()=>{this.showClapMembers()}}
                            onPressOut={()=>{this.setState({modalVisible: false})}}>
                            <Text>{messageProperty.clap.num}</Text>
                        </TouchableOpacity>                      
                    </View>
                    <Text style={styles.date}>
                        {messageProperty.date.year}/{messageProperty.date.month}/{messageProperty.date.date} {messageProperty.date.time}
                    </Text>
                    
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
    },
    clapMembers: {
        width: 350,
        height: 230,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',  
        borderWidth: 2, 
        borderColor: '#333333'
    },
    button: {
        width: 45,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'lightyellow',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1, 
        borderColor: 'red'  
    },
    image: {
        width: 35,
        height: 35,
        margin: 10,
        justifyContent: 'center',
        backgroundColor: 'white',  
        borderWidth: 1, 
        borderColor: 'red'
    },
    friendsMessage: {
        width: 350,
        height: 230,
        backgroundColor: '#F5FCFF',  
        borderWidth: 2, 
        borderColor: '#333333'
      },
    praiseFromTo: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    arrow: {
        width: 25,
        height: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        flex: 3,
        marginRight: 10,
        marginLeft: 10,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 2, 
        borderColor: 'gray'
    },
    messageStatus: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clap: {
        marginLeft: 10,
    },
    date: {
        marginRight: 10,
    },   
  });