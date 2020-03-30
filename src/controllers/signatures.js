import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getSignatureList } from '../actions/signatures';
import { getSignatureSelectedDetails } from '../actions/signatures';
import { getSignatureParticipations } from '../actions/signatures';
import { getSignatureActivities } from '../actions/signatures';
import { MAX_INT } from './';
import { makeMapDispatchToProps } from './util';

// dispatch new actions in response to redux state changes
let SignatureController = ({
  signatureList,
  selectedModel,
  selectedSignature,
  selectedSignatureLoaded,
  getSignatureList,
  getSignatureSelectedDetails,
  getSignatureParticipations,
  getSignatureActivities
}) => {
  // when selected model changes
  // get full signature list
  useEffect(() => {
    if (!selectedModel)
      return;

    getSignatureList({
      model: selectedModel,
      limit: MAX_INT
    });
  }, [selectedModel, getSignatureList]);

  // when full signature list loads or when new signature selected
  // fill in full details of selected signature
  useEffect(() => {
    // if details already filled in, exit
    if (selectedSignatureLoaded)
      return;

    getSignatureSelectedDetails();
  }, [
    signatureList.length,
    selectedSignature.id,
    selectedSignatureLoaded,
    getSignatureSelectedDetails
  ]);

  // when selected signature changes
  // re-get participations
  useEffect(() => {
    // if we don't have all we need, exit
    if (!selectedSignature.id)
      return;

    getSignatureParticipations({
      cancelType: 'GET_SIGNATURE_PARTICIPATIONS',
      id: selectedSignature.id,
      limit: MAX_INT
    });
  }, [selectedSignature.id, getSignatureParticipations]);

  // when selected model or signature changes
  // get signature activities
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (!selectedModel || !selectedSignature.id)
      return;

    getSignatureActivities({
      modelId: selectedModel,
      signatureIds: [selectedSignature.id],
      limit: MAX_INT
    });
  }, [selectedModel, selectedSignature.id, getSignatureActivities]);

  return <></>;
};

const mapStateToProps = (state) => ({
  signatureList: state.signatures.list,
  selectedModel: state.models.selected,
  selectedSignature: state.signatures.selected,
  selectedSignatureLoaded: state.signatures.selected.name ? true : false
});

const mapDispatchToProps = makeMapDispatchToProps({
  getSignatureList,
  getSignatureSelectedDetails,
  getSignatureParticipations,
  getSignatureActivities
});

SignatureController = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatureController);

export { SignatureController };