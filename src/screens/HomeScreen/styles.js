import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 75,
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        paddingBottom: 150
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heartText: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Arial",
        padding: 14,
        marginTop: 10
    },
    progress: {
        paddingLeft: 20,
        marginRight: 'auto',
        paddingTop: 10,
        flexDirection: 'row'
    },
    heart: {
        marginRight: 'auto',
        paddingTop: 10,
        flexDirection: 'row'
    },
    oxygenText: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Arial",
        padding: 14,
        marginTop: 25
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    nameText: {
        fontSize: 24,
        marginRight: 'auto',
        fontWeight: 'bold',
        paddingBottom: 40,
        paddingLeft: 20
    },
})