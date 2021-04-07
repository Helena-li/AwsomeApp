import {Dimensions} from 'react-native';

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;
 
/**
 * translate width from px to dp
 * @param {number} elePx element
 * @returns 
 */
export const pxToDp=(elePx)=>screenWidth*elePx/375;