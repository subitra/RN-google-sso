import React, { useCallback } from 'react';

import { StyleSheet, useColorScheme } from 'react-native';
import { NativeModule } from '../spec/NativeGoogleSignin';
import { Color, GoogleSigninButtonProps } from './statics';
import { GoogleSigninButton as BaseGoogleSigninButton } from './GoogleSigninButton.web';
import { BaseButton } from './BaseButton';

const { BUTTON_SIZE_WIDE, BUTTON_SIZE_ICON, BUTTON_SIZE_STANDARD } =
  NativeModule.getConstants();

/**
 * @group React Components
 * */
export const GoogleSigninButton = (props: GoogleSigninButtonProps) => {
  const { onPress, style, color, size = BUTTON_SIZE_STANDARD, ...rest } = props;
  const activeColorScheme = useColorScheme();
  const usedColor = color ?? activeColorScheme ?? 'light';

  const recommendedSize = getSizeStyle(size);

  const stripOnPressParams = useCallback(() => {
    // this is to make sure that the onPress callback prop is called with no params
    // as the RNGoogleSigninButton onPress does pass some in here
    onPress?.();
  }, [onPress]);

  return (
    <BaseButton
      {...rest}
      size={size}
      onPress={stripOnPressParams}
      color={usedColor}
      style={StyleSheet.compose(recommendedSize, style)}
    />
  );
};

const nativeSizes: typeof BaseGoogleSigninButton.Size = {
  Icon: BUTTON_SIZE_ICON,
  Standard: BUTTON_SIZE_STANDARD,
  Wide: BUTTON_SIZE_WIDE,
};

GoogleSigninButton.Size = nativeSizes;
GoogleSigninButton.Color = Color;

function getSizeStyle(size: GoogleSigninButtonProps['size']) {
  switch (size) {
    case BUTTON_SIZE_ICON:
      return styles.iconSize;
    case BUTTON_SIZE_WIDE:
      return styles.wideSize;
    default:
      return styles.standardSize;
  }
}

// sizes according to https://developers.google.com/identity/sign-in/ios/reference/Classes/GIDSignInButton
const styles = StyleSheet.create({
  iconSize: {
    width: 48,
    height: 48,
  },
  standardSize: { width: 230, height: 48 },
  wideSize: { width: 312, height: 48 },
});
