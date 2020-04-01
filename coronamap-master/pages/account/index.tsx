import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import { t } from 'i18n-js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Router from 'next/router';
import { AuthStatus } from '../../data-types';
import Text from '../../components/Text';
import PageContainer from '../../components/PageContainer';
import Hoverable from '../../components/Hoverable';
import * as SignoutActions from '../../actions/auth/signout';
import { Action, Dispatch } from '../../actions';
import { ReduxRoot } from '../../reducers';
import { Colors, Margins, Shadows } from '../../styles';
import FlexLoader from '../../components/FlexLoader';

const styles = StyleSheet.create({
  title: {
    fontWeight: '900',
    color: Colors.PRIMARY.toString(),
    fontSize: 28,
  },
  formContainer: {
    width: '100%',
    marginTop: Margins.Y,
  },
  itemsContainer: {
    ...Shadows.MAIN_CONTAINER,
    borderRadius: 10,
    shadowRadius: 7,
    marginTop: Margins.MAX_Y,
  },
  item: {
    borderRadius: 0,
    alignSelf: 'flex-start',
    minWidth: 320,
    minHeight: 50,
  },
  topItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  signoutText: {
    color: Colors.RED.toString(),
  },
});

const mapStateToProps = (state: ReduxRoot) => ({
  authStatus: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      signoutUser: SignoutActions.signoutUser,
      clearProgress: () => (d: Dispatch) => d(SignoutActions.clearSignoutProgress()),
    },
    dispatch
  );

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function AccountPage({ signoutUser, authStatus, clearProgress }: Props) {
  React.useEffect(
    () => () => {
      clearProgress();
    },
    [clearProgress]
  );

  React.useEffect(() => {
    if (authStatus === AuthStatus.SignedOut) {
      Router.push('/');
    }
  }, [authStatus]);

  const onLinkPress = (path: string) => () => {
    Router.push(path);
  };

  if (authStatus === AuthStatus.SignedOut) {
    return <FlexLoader />;
  }

  return (
    <PageContainer>
      <Text style={styles.title}>{t('headers.account')}</Text>
      <View style={styles.itemsContainer}>
        <Hoverable
          onPress={onLinkPress('/account/profile')}
          style={StyleSheet.flatten([styles.item, styles.topItem])}>
          <Text>{t('screens.account.profile')}</Text>
        </Hoverable>
        <Hoverable onPress={onLinkPress('/account/update-password')} style={styles.item}>
          <Text>{t('screens.account.updatePassword')}</Text>
        </Hoverable>
        <Hoverable
          onPress={() => signoutUser()}
          style={StyleSheet.flatten([styles.item, styles.bottomItem])}>
          <Text style={styles.signoutText}>{t('buttons.signout')}</Text>
        </Hoverable>
      </View>
    </PageContainer>
  );
}

AccountPage.getInitialProps = async (ctx: NextPageContext) => {
  // do async stuff here to load data
  // ctx.query is the ?params
  // eg:
  // let url = getApiUrl(urlWithQuery('/libraries', ctx.query), ctx);
  // let response = await fetch(url);
  // let result = await response.json();

  return {
    // data: result,
    // query: ctx.query,
    pathname: ctx.pathname,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
