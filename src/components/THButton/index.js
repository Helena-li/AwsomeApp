import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * add beatiful button
 * npm install react-native-linear-gradient --save
 * @returns 
 */
import LinearGradient from 'react-native-linear-gradient';

class THButton extends Component{
    static defaultProps={
        style:{},
        textStyle:{}
    }

    render(){ 
        return(
        <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPress} style={{width:"100%", height:"100%", ...this.props.style, overflow:"hidden"}}>
            <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['#00b5e5', '#0071e5', '#192f6a']} style={styles.linearGradient}>
                <Text style={{...styles.buttonText, ...this.props.textStyle}}>
                    {this.props.children}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
        );
  }}

// Later on in your styles..
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width:"100%",
    height:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default THButton;