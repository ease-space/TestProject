import React, {FunctionComponent} from 'react';
import FastImage from 'react-native-fast-image';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {formatTimestamp} from '../../core/helpers/dateTime';

import {Comment} from '../../core/api/comments/responses';

interface ListItemData extends Comment {
  indent?: number;
}

interface ListItemProps {
  item: ListItemData;
  onPressAddComment(parentId: string): void;
}

const ListItem: FunctionComponent<ListItemProps> = props => {
  const {item, onPressAddComment} = props;

  const {id, timestamp, avatar, user_name, text, indent = ITEM_INDENT} = item;

  return (
    <View style={[styles.contentContainer, {paddingLeft: indent}]}>
      <View style={styles.header}>
        <FastImage
          style={styles.avatar}
          source={
            avatar ? avatar : require('../../assets/images/avatar_mock.png')
          }
        />

        <Text style={styles.userName} numberOfLines={1}>
          {user_name}
        </Text>

        <Text style={styles.timestamp} numberOfLines={1}>
          {formatTimestamp(timestamp)}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>{text}</Text>

        <TouchableOpacity
          style={styles.reply}
          onPress={() => onPressAddComment(id)}>
          <Text>Відповісти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ITEM_INDENT = 16;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
    paddingRight: ITEM_INDENT,
  },
  header: {
    height: 70,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(240, 240, 240)',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    maxWidth: 100,
    marginLeft: 8,
  },
  timestamp: {
    maxWidth: 180,
    marginLeft: 8,
  },
  footer: {
    paddingVertical: 16,
  },
  reply: {
    marginTop: 8,
    marginLeft: 'auto',
  },
});

export default ListItem;
