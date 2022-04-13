import { StyleSheet} from 'react-native';

/**
 * Stylesheet for Home Screen.
 */
export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 3,
        paddingBottom: 20
      },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 0,
        marginBottom: 0,
        flex: 1,
        paddingTop: 0,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 16
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#002366',
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
        marginBottom: 60,
        padding: 0,
        paddingBottom: 15,
    },
    entityContainer: {
        marginTop: 15,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        height: 80,
        paddingTop: 15,
        paddingLeft: 30
    },
    entText: {
        fontSize: 24,
        color: 'black',
        paddingLeft: 0,

    },
    fab: {
        right: 15,
        bottom: 15,
    },
    titleText: {
        fontSize: 18,
        textAlign: "left",
        fontWeight: "bold",
        margin: 3,
    },

})
