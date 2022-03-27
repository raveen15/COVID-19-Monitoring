import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header:{
    backgroundColor: "#DC143C",
    height:200,
  },
  container: {
    paddingBottom: 100,
    backgroundColor: "#FFFFFF"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop: 130
  },
  body:{
    marginTop:40,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 15
  },
  cardContent: {
    fontSize: 23,
    marginLeft: 25,
    fontWeight: "bold"
  },
  icons: {
    fontSize: 100
  },
  cardView: {
    flexDirection: "row",
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600",
    marginTop:30,
    alignSelf:'center'
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:20,
    color: "#696969",
    fontWeight: "600",
    marginTop:30,
    alignSelf:'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
})
