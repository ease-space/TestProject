import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface StubListProps {
  loading?: boolean;
}

const StubList: FunctionComponent<StubListProps> = props => {
  const {loading} = props;

  return (
    <View style={styles.contentContainer}>
      <Text>{loading ? 'Завантаження...' : 'Список пустий'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StubList;
