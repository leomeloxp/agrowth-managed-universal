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

export interface IGoogleMapsContext {
  map?: google.maps.Map;
  markers: Map<string, google.maps.Marker>;
}

export interface IGoogleMapState extends IGoogleMapsContext {
  mapsLoaded: boolean;
}

export const GoogleMapsContext = React.createContext<IGoogleMapsContext>({
  map: undefined,
  markers: new Map()
});

export default class GoogleMap extends React.Component<{}, IGoogleMapState> {
  public state = {
    map: undefined,
    mapsLoaded: false,
    markers: new Map()
  };
  private wrapper?: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.wrapper = React.createRef();
  }

  public componentDidMount = () => {
    /**
     * Import the Google Maps script, but only if we haven't already loaded it once before
     */
    if (
      'undefined' === typeof google ||
      //
      !(google && google.maps)
    ) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.onload = this.waitForMapsScript;
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDbGrQPofvzeiuUkX-66RLlmh3udAjEBd0';
      document.body.appendChild(script);
    } else {
      this.waitForMapsScript();
    }
  };

  public waitForMapsScript = () => {
    if ('undefined' !== typeof google && google.maps && this.wrapper) {
      const map = new google.maps.Map(this.wrapper.current, {
        center: { lat: 49.0285073, lng: -2.1159834 },
        zoom: 8
      });
      this.setState({ map, mapsLoaded: true });
    } else {
      // Fall back scenario in case this function gets called before the Google Maps script is fully parsed, probably won't happen
      window.setTimeout(this.waitForMapsScript, 100);
    }
  };

  public addMarkerToState = ({
    id,
    marker
  }: {
    id: string;
    marker: google.maps.Marker;
  }) => {
    this.setState(currState => {
      const markers = new Map(Array.from(currState.markers));
      markers.set(id, marker);
      return {
        ...currState,
        markers
      };
    });
  };

  public render() {
    return (
      <GoogleMapsWrapper>
        <div className='holder' ref={this.wrapper} />
        {this.state.mapsLoaded && (
          <GoogleMapsContext.Provider
            value={{
              map: this.state.map,
              markers: this.state.markers
            }}
          >
            {this.props.children}
          </GoogleMapsContext.Provider>
        )}
      </GoogleMapsWrapper>
    );
  }
}
