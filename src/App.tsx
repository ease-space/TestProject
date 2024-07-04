import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

import List from './components/commets/List';

import {getComments} from './core/api/comments/requests';
import {Comment} from './core/api/comments/responses';

const App = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const onPressAddComment = useCallback((parentId: string) => {
    console.log('onPressAddComment', parentId);
  }, []);

  useEffect(() => {
    getComments().then(response => setComments(response));
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.contentContainer}>
        <List data={comments} onPressAddComment={onPressAddComment} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});

export default App;
