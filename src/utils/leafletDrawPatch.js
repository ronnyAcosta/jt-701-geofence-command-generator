import L from 'leaflet';
import 'leaflet-draw';

// Guard against double patching (HMR re-executes this module in development)
if (!L.Draw.Polyline.prototype._finishShapePatched) {
  const originalFinishShape = L.Draw.Polyline.prototype._finishShape;

  L.Draw.Polyline.prototype._finishShape = function (...args) {
    // On touch devices the synthesized click lands on the first marker right after
    // it is created and tries to close the shape. Ignore it while there is at most
    // one vertex (also covers calls after the handler was disabled and _markers deleted)
    if (!this._markers || this._markers.length < 2) return undefined;

    return originalFinishShape.apply(this, args);
  };

  L.Draw.Polyline.prototype._finishShapePatched = true;
}