import React, { Component } from "react";
import { View, Text } from "react-native";
import { MeetupApi } from "../../../constants/api";
import styles from './styles/HomeScreen';
import { MyMeetupsList } from './components';
const meetupApi = new MeetupApi(); 

class HomeScreen extends Component {
    static defaultProps = {
        meetupApi
    }
    state = {
        loading: false,
        meetups: []
    }

    async componentDidMount() {
        this.setState({loading: true});
        const meetups = await this.props.meetupApi.fetchGroupMeetup();
        this.setState({ loading: false, meetups })
    }
    render() {
        return (
          <View style={styles.root}>
            <View style={styles.topContainer}>
              <Text>HomeScreen</Text>
            </View>
            <View style={styles.bottomContainer}>
                <MyMeetupsList meetups={this.state.meetups} />
            </View>
          </View>
        );
    }
}

export default HomeScreen;