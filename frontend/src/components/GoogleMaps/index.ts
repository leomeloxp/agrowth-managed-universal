import Map, { GoogleMapsContext } from './GoogleMapsMap';
import Marker from './GoogleMapsMarker';

/**
 * Make Google Maps related components work both as a namespace (`export default class¦) and as a named export (`export { name }`)
 */

export default class GoogleMaps {
  public static Map = Map;
  public static Marker = Marker;
  public static GoogleMapsContext = GoogleMapsContext;
}

export { GoogleMapsContext, Map, Marker };
