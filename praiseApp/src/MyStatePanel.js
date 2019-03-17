import React, {Component} from 'react';
import { Button, Image, Modal, Picker, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class MyStatePanel extends Component {
    constructor(props) {
        super(props);
        this.pickerItems=[]
        this.state = {
            modalVisible: false,
            selected: this.createPickerItems(),
            user: {
                name: null,
                image: require('../images/init.jpg'),
                clappable: null, 
                clapped: null,    
            },
        };
      }
    openModal() {
        this.setState({modalVisible:true});
    }
    closeModal() {
        if(this.state.user.name == null){
            this.setState({user: this.findUser(this.state.selected)})
            this.props.selectFromUser(this.state.selected)
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
        return (
            <View style={this.props.style}>
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
                                                        user: this.findUser(itemValue)})
                                         this.props.selectFromUser(itemValue)}}>
                                    {this.pickerItems}
                                </Picker>
                            </View>
                            <Button
                                    onPress={() => {this.closeModal()}}
                                    title={'私だ'}/>
                        </View>
                    </View>
                </Modal>
                <View style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
                    <TouchableOpacity
                        onPress={() => this.openModal()}>
                        <Image
                            style={styles.image}
                            source={this.state.user.image}/>
                        </TouchableOpacity>
                        <Text>{this.state.user.name}</Text>
                </View> 
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {this.state.user.name!=null
                    ?
                    <Text style={styles.state}>
                        拍手できる:{this.state.user.clappable},
                        拍手された:{this.state.user.clapped}
                    </Text> 
                    :
                    <Text style={styles.state}>画像タップでユーザーを選択</Text>
                    }
                </View>
            </View>

        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
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
        borderColor: 'red'
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

    state: {
      width: 250,
      height: 30,
      fontSize: 19,
      textAlign: 'center',
      margin: 10,
    },
  });