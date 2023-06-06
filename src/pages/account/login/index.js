import React, {Component} from 'react';
import {View, Text, Image, StatusBar, Button, ScrollView, StyleSheet} from 'react-native';
import {Input, ListItem} from 'react-native-elements';
import {pxToDp} from '../../../utils/stylesKits';
import request from '../../../utils/request';
import {DIVISION} from '../../../utils/pathMap';
import {authenticate} from '../../../utils/auth';
import validator from '../../../utils/validator';
import Toast from '../../../utils/toast';
import THButton from '../../../components/THButton';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

class Login extends Component {
  
  state={
    phoneNumber:'',
    phoneValid:true,
    bu:[],
    verifyCode:'',
    retriveTimerBtnText:'Get Verify Code',
    isCountingDown:false
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
  }

  setVerifyValue=(verifyCode)=>{
    this.setState({verifyCode})
  }

  getVerifyCode=()=>{
    this.countDown();
  }

  countDown=()=>{
    if(this.state.isCountingDown){
      return;
    }

    let seconds = 5;
    this.setState({retriveTimerBtnText:`Get Verify Code (${seconds}s)`, isCountingDown: true});

    let timeId = setInterval(() => {
      seconds--;
      this.setState({retriveTimerBtnText:`Get Verify Code (${seconds}s)`});
      if(seconds === 0){
        clearInterval(timeId);
        this.setState({retriveTimerBtnText:`Get Verify Code`, isCountingDown:false});
      }
    }, 1000);
  }

  getBu=()=>{
    request.get(DIVISION).then(response=>{
      console.log(response)
      this.setState({bu: response.data.result})
    })
  }

  submitVerifyCode=()=>{
    const {verifyCode} = this.state;
    if(verifyCode.length!==6){
      Toast.message("Wrong verify code!", 1000, "center")
      return;
    }

    // send back to backend to verify
  }

  login = ()=>{

  /**
   * use library to add waiting spin
   * npm install --save teaset
   * change components/ListRow/TouchableOpacity.js file
   */
    
    Toast.showLoading('Toast message');
    // send authentication to Auth0 on Drift
    authenticate().then(()=>Toast.hideLoading());
    this.props.navigation.navigate("UserInfo")
  }

  render() {
    const {phoneNumber, phoneValid, bu, verifyCode, retriveTimerBtnText,isCountingDown}=this.state;

    return (
      <ScrollView>
        <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
        <Image style={{width:"100%", height:pxToDp(200)}}  source={require("../../../res/angryBirds.jpeg")} />
        
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
         <View style={{margin:pxToDp(10)}}>
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

        <View style={{margin:pxToDp(0)}}>
          <THButton 
            disabled={isCountingDown}
            onPress={this.getVerifyCode} 
            style={{width:"80%", height:pxToDp(40), alignSelf:"center", borderRadius:pxToDp(20)}}>
              {retriveTimerBtnText}
          </THButton>
        </View>

        <View style={{margin:pxToDp(30)}}>
          <Text >Please fill the code you recieved</Text>
          <CodeField
            value={verifyCode}
            onChangeText={this.setVerifyValue}
            onSubmitEditing={this.submitVerifyCode}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <View style={{margin:pxToDp(0)}}>
          <THButton 
            onPress={this.login} 
            style={{width:"80%", height:pxToDp(40), alignSelf:"center", borderRadius:pxToDp(20)}}>
              Login
          </THButton>
        </View>

        <View style={{margin:pxToDp(20)}}>
          <Button onPress={() =>this.getBu()} title={"Get Business Unit In Drift"}></Button>
        </View>

        <View style={{margin:pxToDp(20)}}>
          {Array.isArray(bu) && bu.length? bu.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{l.businessUnitName}</ListItem.Title>
                <ListItem.Subtitle>{l.divisionName}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )):null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color:'#0071e5'
  },
  focusCell: {
    borderColor: '#00b5e5',
  },
});

export default Login;