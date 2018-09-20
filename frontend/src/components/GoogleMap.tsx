import React from 'react';
import styled from 'styled-components';

const GoogleMapsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  max-width: calc(100% - 2rem);
  margin: 0 auto;
  .holder {
    min-height: 300px;
    width: 100%;
  }
`;

export interface IGoogleMapContext {
  map?: google.maps.Map;
}

export interface IGoogleMapState {
  mapsLoaded: boolean;
  map?: google.maps.Map;
}

export const GoogleMapContext = React.createContext<IGoogleMapContext>({
  map: undefined
});

export default class GoogleMap extends React.Component {
  private wrapper?: React.RefObject<HTMLDivElement>;

  public state = {
    mapsLoaded: false,
    map: undefined
  };

  constructor(props: any) {
    super(props);
    this.wrapper = React.createRef();
  }

  componentDidMount = () => {
    this.waitForMapsScript();
  };

  waitForMapsScript = () => {
    if (google && google.maps && this.wrapper) {
      const map = new google.maps.Map(this.wrapper.current, {
        center: { lat: 49.0285073, lng: -2.1159834 },
        zoom: 8
      });
      this.setState({ map, mapsLoaded: true });
    } else {
      window.setTimeout(this.waitForMapsScript, 100);
    }
  };
  render() {
    return (
      <GoogleMapsWrapper>
        <div className="holder" ref={this.wrapper} />
        {this.state.mapsLoaded && (
          <GoogleMapContext.Provider
            value={{
              map: this.state.map
            }}
          >
            {this.props.children}
          </GoogleMapContext.Provider>
        )}
      </GoogleMapsWrapper>
    );
  }
}
