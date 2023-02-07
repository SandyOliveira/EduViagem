import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import UploadComponent from '../components/upload'

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: 'image_1',
      dropdownHeight: 40,
    };
  }

  componentDidMount() {}

  render() {
        
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.iconImage}></Image>
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text style={styles.appTitleText}>Novo Post</Text>
          </View>
        </View>
        <View style={styles.fieldsContainer}>
          <ScrollView>
            <TextInput
              style={styles.inputFont}
              onChangeText={(nameTravel) => this.setState({ nameTravel })}
              placeholder={'nome da viagem'}
              placeholderTextColor="white"
            />
            <TextInput
              style={styles.inputFont}
              onChangeText={(description) => this.setState({ description })}
              placeholder={'Descrição'}
              placeholderTextColor="white"
            />
            <UploadComponent />
            
          </ScrollView>
        </View>
        <View style={{ flex: 0.08 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'black',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    margin: RFValue(25)
  },
});
