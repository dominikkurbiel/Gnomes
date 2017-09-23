import React from 'react';
import { connect } from 'react-redux';
import MonsterView from './MonsterView';
import RequestChangeForm from './RequestChangeForm';

import { fetchGnomes, sendDataRequestChange, mouseHover } from '../actions/gnomesActions';

@connect(store => {
  return {
    gnomes: store.gnomeReducer.gnomes,
    fetched: store.gnomeReducer.fetched,
    isMouseOver: store.gnomeReducer.isMouseOver,
  };
})
export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemID: undefined,
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchGnomes());
  }

  toggleFormFunc(id) {
    const currentItemID = id !== this.state.currentItemID ? id : undefined;
    this.setState({ currentItemID });
  }

  handleSubmitForm = values => {
    this.props.dispatch(sendDataRequestChange(values));
    this.setState({ currentItemID: undefined });
  };

  render() {
    return (
      <main className="main">
        <div className="list__container container">
          <h2 className="main__title">Gnomes</h2>
          <ul className="monster__list list">
            {this.props.gnomes.map(gnome => {
              return (
                <MonsterView
                  key={gnome.id}
                  id={gnome.id}
                  name={gnome.name}
                  strenght={gnome.strenght}
                  age={gnome.age}
                >
                  <button
                    className="btn btn__purple"
                    itemID={gnome.id}
                    onClick={() => this.toggleFormFunc(gnome.id)}
                  >
                    Change data
                  </button>

                  {this.state.currentItemID === gnome.id ? (
                    <RequestChangeForm
                      initialValues={{
                        id: gnome.id,
                        newName: gnome.name,
                        newAge: gnome.age,
                        newStrenght: gnome.strenght,
                      }}
                      id={gnome.id}
                      newName={gnome.name}
                      newAge={gnome.age}
                      newStrenght={gnome.strenght}
                      onSubmit={this.handleSubmitForm}
                    />
                  ) : null}
                </MonsterView>
              );
            })}
          </ul>
        </div>
      </main>
    );
  }
}
