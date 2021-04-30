import { StyleSheet, Dimensions, StatusBar } from "react-native";

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
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 25,
        zIndex: 2,
        backgroundColor: '#fefefe',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: deviceHeight / 1.55,
        width: deviceWidth
    },
    generalBtn: {
        zIndex: 1,
        marginBottom: 15,
        marginTop: 20,
        borderRadius: 12,
        backgroundColor: '#e88c39',
        padding: 8,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    calendar: {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1066,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default theme;