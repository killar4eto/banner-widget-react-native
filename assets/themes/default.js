import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const windowSize = Dimensions.get('window');
const deviceWidth = windowSize.width;
const deviceHeight = windowSize.height;
const androidHeight = StatusBar.currentHeight > 24 ? StatusBar.currentHeight : 12;

const theme = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'transparent'
    },
    containerMid: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: deviceWidth - 50
    },
    centeredContainer: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    spaceBetweenContainer: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingTop: androidHeight
    },
    main_bg: {
        width: deviceWidth,
        height: deviceHeight,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    intro_video: {
        width: deviceWidth,
        height: deviceHeight / 2.5
    },
    authCentralContainer: {
        position: 'relative',
        alignSelf: 'center',
        flexDirection: 'column',
        top: 30,
        zIndex: 1040,
        width: deviceWidth - 50,
        height: deviceHeight / 2.5,
        // backgroundColor: '#1f231f',
        borderColor: '#1f231f',
        borderWidth: 1,
        borderRadius: 12,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.48,
        shadowRadius: 5.84,
        elevation: 9
    }
});

export default theme;