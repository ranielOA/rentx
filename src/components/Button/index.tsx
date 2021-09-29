import React from 'react';
import { ActivityIndicator } from 'react-native';
import { FlattenSimpleInterpolation, useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
  enabled?: boolean;
  buttonStyle?: FlattenSimpleInterpolation;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false,
  buttonStyle,
}: Props) {
  const theme = useTheme();

  return (
    <Container
      color={color ? color : theme.colors.main}
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
      buttonStyle={buttonStyle}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
