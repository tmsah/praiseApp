import React, {Component} from 'react';
import {Button, Image, Modal, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default class MyEditorPanel extends Component {
    constructor(props) {
        super(props);      
        this.pickerItems=[];
        selected=this.createPickerItems();
        this.state = {
            modalVisible: false,
            selected,
            user: {
                name: null,
                image: require('../images/init.jpg'),
                clappable: null, 
                clapped: null,    
            },
            message: null,
            length: 0
        };
    }

    openModal() {
        this.setState({modalVisible:true});
    }

    closeModal() {
        if(this.state.user.name == null){
            this.setState({user: this.findUser(this.state.selected)})
        }
        this.setState({modalVisible:false});
    }

    findUser(key) {
        for(let i in this.props.allUsers){
            if(this.props.allUsers[i].name == key){
                return this.props.allUsers[i]
            }
        }
        return null
    }

    createPickerItems() {
        for(let i in this.props.allUsers){
            this.pickerItems.push(
                <Picker.Item label={this.props.allUsers[i].name} value={this.props.allUsers[i].name} />
            )
            selected = this.props.allUsers[i].name
        }
        return selected
    }

    render(){
        minLength=5;
        maxLength=140;
        function sendDate(today){
            this.today=today;
            this.year = today.getFullYear();
            this.month = today.getMonth()+1;
            this.date = today.getDate();
            this.time = today.toLocaleTimeString();
        }
        sendDate =  new sendDate(new Date());        
        return (
            <View style={this.props.myEditor}>
                <Text>あなたの仲間の行動を紹介しよう！</Text>
                <View style={{justifyContent: 'center',
                    flexDirection: 'row'}}>
                    <Modal
                        visible={this.state.modalVisible}
                        transparent='false'
                        animationType={'slide'}>
                        <View style={styles.container}>
                            <View style={styles.selectMenu}>
                                <View style={styles.picker}>
                                    <Picker
                                        selectedValue={this.state.selected}
                                        style={{height: 100, width: '100%'}}
                                        onValueChange={(itemValue) =>
                                        {this.setState({selected: itemValue,
                                                        user: this.findUser(itemValue)})}
                                        }>
                                        {this.pickerItems}
                                    </Picker>
                                </View>
                                <Button
                                    onPress={() => {this.closeModal()
                                        }}
                                    title={'お前だったのか'}/>
                            </View>
                        </View>
                    </Modal>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => this.openModal()}>
                            <Image
                                style={styles.image}
                                source={this.state.user.image}/>
                        </TouchableOpacity>
                        <Text>{this.state.user.name}</Text>
                    </View>
                    <TextInput
                        style={styles.messageForm}
                        multiline={true}
                        maxLength={maxLength}
                        placeholder={'あなたの仲間の行動を紹介しよう！'}
                        value = {this.state.message}
                        onChangeText={(message) => this.setState({message, length: message.length})}
                    />
                </View>
                <View style={styles.countString}>
                <Text>{this.state.length}/{maxLength}</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    <Button styles={styles.button}
                        disabled={this.state.length<minLength || this.state.user.name==null || this.props.fromUser==null}
                        onPress={() => {this.props.sendMessage(this.state.message, sendDate, this.state.user.name)
                                        this.setState({message: '', length: 0})}}
                        title={'紹介する'}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 3
      },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
    }, 
    countString: {
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    image: {
      width: 70,
      height: 70,
      margin: 10,
      justifyContent: 'center',
      backgroundColor: 'white',  
      borderWidth: 1, 
      borderColor: 'red'
    },
    picker: {
        width: '100%',
        height: 200,  
        alignItems: 'center',
        borderStyle: 'solid',
    },
    selectMenu: {
        width: '80%',
        height: 250,  
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 2, 
        borderColor: 'gray'
    },
    messageForm: {
        width: 250,
        height: 100,
        margin: 10,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 2,
        backgroundColor: 'white',
      }
  });