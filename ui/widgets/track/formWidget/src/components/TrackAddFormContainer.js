import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import keycloakType from 'components/__types__/keycloak';
import withKeycloak from 'auth/withKeycloak';
import { AuthenticatedView, UnauthenticatedView } from 'auth/KeycloakViews';
import { apiTrackPost } from 'api/tracks';
import Notification from 'components/common/Notification';
import TrackForm from 'components/TrackForm';

class TrackAddFormContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      notificationMessage: null,
      notificationStatus: null,
    };

    this.closeNotification = this.closeNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeNotification() {
    this.setState({
      notificationMessage: null,
    });
  }

  async handleSubmit(track) {
    const { t, onCreate, keycloak, serviceUrl } = this.props;
    const authenticated = keycloak.initialized && keycloak.authenticated;

    if (authenticated) {
      try {
        const createdTrack = await apiTrackPost(serviceUrl, track);
        onCreate(createdTrack);
        this.setState({
          notificationMessage: t('common.dataSaved'),
          notificationStatus: Notification.SUCCESS,
        });
      } catch (err) {
        this.handleError(err);
      }
    }
  }

  handleError(err) {
    const { onError, t } = this.props;
    onError(err);
    this.setState({
      notificationMessage: t('error.dataLoading'),
      notificationStatus: Notification.ERROR,
    });
  }

  render() {
    const { keycloak, onCancelEditing, t } = this.props;
    const { notificationMessage, notificationStatus } = this.state;

    return (
      <>
        <UnauthenticatedView keycloak={keycloak}>
          {t('common.notAuthenticated')}
        </UnauthenticatedView>
        <AuthenticatedView keycloak={keycloak}>
          <TrackForm onSubmit={this.handleSubmit} onCancelEditing={onCancelEditing} />
        </AuthenticatedView>
        <Notification
          status={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </>
    );
  }
}

TrackAddFormContainer.propTypes = {
  onError: PropTypes.func,
  onCancelEditing: PropTypes.func,
  onCreate: PropTypes.func,
  t: PropTypes.func.isRequired,
  keycloak: keycloakType.isRequired,
  serviceUrl: PropTypes.string,
};

TrackAddFormContainer.defaultProps = {
  onError: () => {},
  onCancelEditing: () => {},
  onCreate: () => {},
  serviceUrl: '',
};

export default withKeycloak(withTranslation()(TrackAddFormContainer));
