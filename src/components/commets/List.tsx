import React, {FunctionComponent, useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, ListRenderItemInfo} from 'react-native';

import ListItem, {ITEM_INDENT} from './ListItem';

import {createDataTree, getDataTreeLevelMap} from '../../core/helpers/dataTree';

import {Comment} from '../../core/api/comments/responses';

interface ListProps {
  data: Comment[];
  onPressAddComment(parentId: string): void;
}

const List: FunctionComponent<ListProps> = props => {
  const {data, onPressAddComment} = props;

  const transformedData = useMemo(() => {
    const dataTree = createDataTree(data);

    const dataTreeLevelMap = getDataTreeLevelMap(dataTree);

    return data.map(item => {
      return {
        ...item,
        indent: dataTreeLevelMap[item.id] * ITEM_INDENT,
      };
    });
  }, [data]);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Comment>) => {
      return <ListItem item={item} onPressAddComment={onPressAddComment} />;
    },
    [onPressAddComment],
  );

  return (
    <FlatList
      data={transformedData}
      extraData={transformedData}
      contentContainerStyle={styles.listContentContainer}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
  },
});

export default List;
