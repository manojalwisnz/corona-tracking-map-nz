import React from 'react';
import { Animated, ActivityIndicator, StyleSheet } from 'react-native';
import Text from '../Text';
import { Colors, Paddings, Margins } from '../../styles';
import withDelayedUnmount from '../../hocs/withDelayedUnmount';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.6,
    shadowColor: Colors.CLUSTER_BASE.toString(),
    backgroundColor: Colors.CLUSTER_BASE.toString(),
    paddingHorizontal: Paddings.X,
    paddingVertical: Paddings.Y,
    borderRadius: 25,
  },
  text: {
    marginLeft: Margins.X,
    color: 'white',
  },
});

interface Props {
  message: string;
  style?: any;
}

function LoadingIndicator({ message, style }: Props) {
  return (
    <Animated.View style={[styles.container, style]}>
      <ActivityIndicator size="small" color="white" />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

export default withDelayedUnmount(LoadingIndicator);
