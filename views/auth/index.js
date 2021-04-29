import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar, Animated, Easing, KeyboardAvoidingView } from "react-native";
import  { Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

const INTRO = require('../../assets/videos/intro.mp4');

export default function Login(props) {
    StatusBar.setBarStyle("light-content", true);
    const video = useRef(null);
    const [status, setStatus] = useState(true);
    const [muted, setMuted] = useState(false);
    const replayAnimation = useRef(new Animated.Value(0)).current;

    const playAnimation = () => {
        replayAnimation.setValue(0);

        Animated.timing(
            replayAnimation,
            {
                toValue: 1,
                useNativeDriver: true,
                duration: 800,
                easing: Easing.linear
            }
        ).start();
    }

    return (
        <View style={[props.extraProps.theme.container, {backgroundColor: '#1f231f'}]}>
            <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 1}}>
                <TouchableOpacity style={{position: 'absolute', bottom: 35, left: 20, zIndex: 2}} onPress={() => setMuted(!muted)} activeOpacity={0.6}>
                    <MaterialIcons name={muted ? 'volume-off' : 'volume-mute'} size={30} color='#fff'/>
                </TouchableOpacity>

                <Video
                    ref={video}
                    style={[props.extraProps.theme.intro_video, {borderBottomRightRadius: 320, borderBottomLeftRadius: 10}]}
                    resizeMode="cover"
                    source={INTRO}
                    isMuted={muted}
                    volume={0.2}
                    isLooping={false}
                    shouldPlay={true}
                    onPlaybackStatusUpdate={(status) => {
                        setStatus(status);

                        if(status.didJustFinish) {
                            playAnimation();
                        }
                    }}
                />

                {!status.isPlaying ?
                    <Animated.View style={{position: 'absolute', top: -20, left: 0, right: 0, bottom: 0, zIndex: 2, justifyContent: 'center', alignItems: 'center', opacity: replayAnimation}}>
                        <TouchableOpacity onPress={() => video.current.replayAsync()} activeOpacity={0.6}>
                            <MaterialIcons name='replay' size={90} color='#fff'/>
                        </TouchableOpacity>
                    </Animated.View>
                    :
                    null
                }
            </View>


            <KeyboardAvoidingView enabled behavior={'padding'} style={{flex: 1}}>
                <LinearGradient
                    colors={['#1f231f', '#292b29']}
                    locations={[0.8, 0.5]}
                    style={props.extraProps.theme.authCentralContainer}
                >
                    <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, fontFamily: 'Roboto', color: '#fff'}}>Country</Text>
                        <TextInput
                            style={{
                                width: '100%',
                                height: 35,
                                borderBottomWidth: 1,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                borderBottomColor: 'red',
                                paddingLeft: 12,
                                color: '#fff',
                                fontSize: 16,
                                fontFamily: 'Roboto'
                            }}
                            defaultValue={"Latvia"}
                            placeholderColor='#fff'
                        />
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        </View>
    )
}