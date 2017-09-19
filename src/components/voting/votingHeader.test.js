import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import PropTypes from 'prop-types';
import i18n from '../../i18n';
import { VotingHeaderRaw } from './votingHeader';
import VoteDialog from '../voteDialog';

describe('VotingHeader', () => {
  let wrapper;
  const mockStore = configureStore();
  const voteDict = {
    username3: { confirmed: false, unconfirmed: true, publicKey: 'sample_key3' },
  };
  const unvoteDict = {
    username1: { confirmed: true, unconfirmed: false, publicKey: 'sample_key1' },
  };
  const votes = Object.assign({}, voteDict, unvoteDict);
  const props = {
    store: mockStore({ runtime: {} }),
    votedDelegates: [
      {
        username: 'username1',
        address: 'address 1',
      },
      {
        username: 'username2',
        address: 'address 2',
      },
    ],
    setActiveDialog: sinon.spy(),
    voteToggled: sinon.spy(),
    addTransaction: sinon.spy(),
    search: sinon.spy(),
    t: key => key,
  };

  describe('Vote and Unvote', () => {
    beforeEach(() => {
      wrapper = mount(<VotingHeaderRaw {...props} votes={votes} />, {
        context: { store: mockStore, i18n },
        childContextTypes: {
          store: PropTypes.object.isRequired,
          i18n: PropTypes.object.isRequired,
        },
      });
    });

    it('should render an Input', () => {
      expect(wrapper.find('Input')).to.have.lengthOf(1);
    });
    it('should render 2 menuItem', () => {
      expect(wrapper.find('MenuItem')).to.have.lengthOf(2);
    });

    it('should render i#searchIcon with text of "search" when this.search is not called', () => {
      // expect(wrapper.find('i.material-icons')).to.have.lengthOf(1);
      expect(wrapper.find('#searchIcon').text()).to.be.equal('search');
    });

    it('should render i#searchIcon with text of "close" when this.search is called', () => {
      wrapper.instance().search('query', '555');
      expect(wrapper.find('#searchIcon').text()).to.be.equal('close');
    });

    it('should this.props.search when this.search is called', () => {
      const clock = sinon.useFakeTimers();
      wrapper.instance().search('query', '555');
      clock.tick(250);
      expect(props.search).to.have.been.calledWith('555');
    });

    it('click on #searchIcon should clear value of search input', () => {
      wrapper.instance().search('query', '555');
      wrapper.find('#searchIcon').simulate('click');
      expect(wrapper.state('query')).to.be.equal('');
    });

    it('click on vote button should call setActiveDialog with VotingDialog as childComponent', () => {
      wrapper.find('.vote-button').simulate('click');
      expect(props.setActiveDialog).to.have.been.calledWith({
        title: 'Vote for delegates',
        childComponent: VoteDialog,
      });
    });
  });

  describe('Only vote', () => {
    beforeEach(() => {
      wrapper = mount(<VotingHeaderRaw {...props} votes={voteDict} />, {
        context: { store: mockStore },
        childContextTypes: { store: PropTypes.object.isRequired },
      });
    });

    it('should render vote button reflecting only (up)vote', () => {
      expect(wrapper.find('.vote-button-info').text()).to.be.equal('Vote (+1)');
    });
  });

  describe('Only unvote', () => {
    beforeEach(() => {
      wrapper = mount(<VotingHeaderRaw {...props} votes={unvoteDict} />, {
        context: { store: mockStore },
        childContextTypes: { store: PropTypes.object.isRequired },
      });
    });

    it('should render vote button reflecting only unvote', () => {
      expect(wrapper.find('.vote-button-info').text()).to.be.equal('Vote (-1)');
    });
  });

  describe('Without votes', () => {
    beforeEach(() => {
      wrapper = mount(<VotingHeaderRaw {...props} votes={ {} } />, {
        context: { store: mockStore },
        childContextTypes: { store: PropTypes.object.isRequired },
      });
    });

    it('should disable my votes button', () => {
      expect(wrapper.find('.my-votes-button button').hasClass('disableMenu__icon___2NDu1')).to.equal(true);
    });
  });
});
