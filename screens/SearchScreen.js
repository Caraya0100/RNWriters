import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';

import {
    getEntries,
} from '../actions/Actions';

const mapStateToProps = state => {
    return { 
        entries: state.search.entries
    };
};
class SearchScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getEntries();
    }

    render() {
        return (
            <View>
                <Text>
                    Search screen.
                </Text>
            </View>
        );
    }
}

export default connect(mapStateToProps, { getEntries })(SearchScreen);
