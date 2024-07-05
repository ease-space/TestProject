import React, {FunctionComponent, useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, ListRenderItemInfo} from 'react-native';

import StubList from '../common/StubList';

import CommentListItem, {COMMENT_ITEM_INDENT} from './CommentListItem.tsx';

import {createDataTree, getDataTreeLevelMap} from '../../core/helpers/dataTree';

import {Comment} from '../../core/api/comments/responses';

interface CommentsListProps {
  data: Comment[];
  loading: boolean;
  onPressAddComment(parentId: string): void;
}

const CommentsList: FunctionComponent<CommentsListProps> = props => {
  const {data, loading, onPressAddComment} = props;

  const dataTransformed = useMemo(() => {
    const dataTree = createDataTree(data);

    const dataTreeLevelMap = getDataTreeLevelMap(dataTree);

    return data.map(item => {
      return {
        ...item,
        indent: dataTreeLevelMap[item.id] * COMMENT_ITEM_INDENT,
      };
    });
  }, [data]);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Comment>) => {
      return (
        <CommentListItem item={item} onPressAddComment={onPressAddComment} />
      );
    },
    [onPressAddComment],
  );

  return (
    <FlatList
      data={dataTransformed}
      extraData={dataTransformed}
      contentContainerStyle={styles.listContentContainer}
      ListEmptyComponent={<StubList loading={loading} />}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
  },
});

export default CommentsList;
