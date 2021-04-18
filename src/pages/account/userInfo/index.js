import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

class UserInfo extends Component{
  
    render(){ 
        return(
        <View style={{backgroundColor:"#fff", flex:1, padding: pxToDp(20)}}>
            <Text style={{fontSize:pxToDp(20), color:"#666", fontWeight:"bold"}}>
                    User Information
            </Text>
        </View>
        );
  }}

export default UserInfo;