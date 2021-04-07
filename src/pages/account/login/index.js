import React, {Component} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {Input} from 'react-native-elements';
import {pxToDp} from '../../../utils/stylesKits';
import request from '../../../utils/request';
import {ACCOUNT_LOGIN} from '../../../utils/pathMap';
import validator from '../../../utils/validator';

class Login extends Component {

  state={
    phoneNumber:'',
    phoneValid:true
  }

  changePhoneNumber=(phoneNumber)=>{
    this.setState({phoneNumber});
  }

  phoneNumberSubmit=()=>{
    const {phoneNumber} = this.state
    const phoneValid = validator.validatePhoneNumber(phoneNumber)

    if(!phoneValid){
      this.setState({phoneValid})
      return;
    }

    const res = await request.post(ACCOUNT_LOGIN, {
      phone: phoneNumber
    });
    console.log(res);
  }

  render() {
    const {phoneNumber, phoneValid}=this.state;

    return (
      <View>
        <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
        <Image style={{width:"100%", height:pxToDp(240)}}  source={require("../../../res/angryBirds.jpeg")} />
        
        <View style={{padding:pxToDp(20)}}>
          <Text style={{fontSize:pxToDp(25), fontWeight:"bold"}} >Login</Text>
        </View>

        {/**
         * to use input element, use library
         * npm install react-native-elements
         * npm i react-native-elements --save
         * npm i --save react-native-vector-icons
         * npm i --save react-native-safe-area-context
         * configure grandle to use icons
         */}
         <View style={{margin:pxToDp(20)}}>
          <Input
            placeholder='Please input your phone number'
            leftIcon={{ type: 'font-awesome', name: 'phone' }}
            maxLength={17}
            keyboardType="phone-pad"
            onChangeText={this.changePhoneNumber}
            value={phoneNumber}
            errorMessage={phoneValid?"":"wrong phone number format"}
            onSubmitEditing={this.phoneNumberSubmit}
          />
        </View>
      </View>
    );
  }
}

export default Login;