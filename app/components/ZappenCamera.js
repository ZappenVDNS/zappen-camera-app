0/**
 * Zappen React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { 
    AsyncStorage,
    CameraRoll, 
    Dimensions, 
    Image, 
    Linking,
    StyleSheet, 
    Text, 
    TouchableHighlight,
    TouchableOpacity,
    View, 
    Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Camera from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal'
    
var device = Dimensions.get('window');

class ZappenCamera extends Component { 
    constructor(props) {
        super(props);
        this.takePicture = this.takePicture.bind(this);
        this.state = {
            visible: true, 
            loading: false,
            modalVisible: false,
            firstLaunch: null,
        };
    }

    static navigationOptions = {
       title: "Zappen",  
    };
    
    componentDidMount(){
        AsyncStorage.getItem("alreadyLaunched").then(value => {
            if(value == '0' || value === null){
                 AsyncStorage.setItem('alreadyLaunched', '1'); // No need to wait for `setItem` to finish, although you might want to handle errors
                 this.setState({modalVisible: true});
            }
            else{
                 this.setState({modalVisible: false});
            }}) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
        AsyncStorage.getItem('alreadyLaunched').then((res) => console.log(res))
    }
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    
    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={{fontWeight: 'bold', color: '#f4ead3'}}>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#4E2B1A' }}>Connect with your camera phone!</Text>
            <Text></Text>
            <Text style={{ color: '#4E2B1A' }} >When you're out and about,  and see the <Text style={{ fontWeight: 'bold'}}>Zappen</Text> icon </Text>
                <Image source={require('../img/bt_zapp_view.png')} style={styles.modalZapp} />
            <Text style={{ color: '#4E2B1A' }}> snap a picture with your mobile phone. <Text style={{textDecorationLine: "underline",}} onPress={() => Linking.openURL('https://zappen.co/custom-solutions/')}>Learn More</Text></Text>
            {this._renderButton('Close', () => this.setState({ modalVisible: false }))}
        </View>
    );

    takePicture(dataLoaded) {
        this.setState({ loading: true });
        this.camera.capture()
        .then((data) => {
            RNFetchBlob.fetch('POST','http://ZAPPEN_SERVER_URL:4212/index/searcher', {
                'Accept': 'application/json',
                'Content-Type' : 'application/octet-stream',                
            }, RNFetchBlob.wrap(data.path))
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if(responseData.type === "SEARCH_RESULTS" && responseData.image_ids.length) {
                    var tags = JSON.stringify(responseData.tags[0]);
                    tags = tags.substring(2,tags.length-2);
                    tags = tags.replace(/(:'[^']*)'([^']*',)/g,'$1s$2');
                    tags = tags.replace(/'/g,"\"");
                    tags = "{" + tags + "}";
                    var tagsjson = JSON.parse(tags); 
                    var zapurl = tagsjson.url;
                    this.setState({loading: false})
                    this.props.navigation.navigate('Web', { url: zapurl });
                } else {
                     Alert.alert(
                        'No Image Matched',
                        'Zapp Again',
                        [
                            {text: 'OK', onPress: () => this.setState({loading: false})}
                        ],
                        { cancelable: false }
                    )
                    
                }    
            })
            .done(); 
        })
    } 

    render() {
        const { loading } = this.state;
        const {goBack} = this.props.navigation;
        const {navigate} = this.props.navigation;
        const renderTouchable = () => <TouchableOpacity/>; 
        
    	return (              
            <View style={styles.container}>
                {loading && (
                    <Spinner 
                        visible={true} 
                        textContent={"Zapping..."} 
                        textStyle={{color: '#FFF'}} 
                        cancelable={true}/>
                )}
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    captureTarget = {Camera.constants.CaptureTarget.temp}
                    captureQuality = {Camera.constants.CaptureQuality["480p"]}
                    playSoundOnCapture = {false} >
                    <View style={styles.modalRow}>  
                        <TouchableOpacity onPress={this.takePicture}>
                            <Image source={require('../img/bt_zapp_view.png')} style={styles.capture} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ modalVisible: true}) }>
                            <View style={styles.modalButton}>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#4E2B1A' }}>?</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Camera>
                <Modal visible={this.state.modalVisible}>
                    {this._renderModalContent()}
                </Modal>
            </View>
    	);
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: '#f4ead3',
        margin: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
     modalZapp: {
        width: 50,
        height: 50,
        margin: 10,
    },
    button: {
        alignSelf: 'flex-end',
        backgroundColor: '#4E2B1A',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
    },
    capture: {
        alignSelf: 'center',
        width: 70,
        height: 70,
        margin: 20,
    },
    modalButton: {
        flex: 0,
        marginTop: 50,
        marginRight: 20,
        marginLeft: 70,
        backgroundColor: '#f4ead3',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

});

module.exports = ZappenCamera;
