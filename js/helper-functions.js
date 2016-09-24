/** Mixin to extend the behavior of the Google Maps JS API Polygon type
 *  to determine if a polygon path has clockwise of counter-clockwise winding order.
 *
 *  Tested against v3.14 of the GMaps API.
 *
 *  @author  stevejansen_github@icloud.com
 *
 *  @license http://opensource.org/licenses/MIT
 *
 *  @version 1.0
 *
 *  @mixin
 *
 *  @param {(number|Array|google.maps.MVCArray)} [path] - an optional polygon path; defaults to the first path of the polygon
 *  @returns {boolean} true if the path is clockwise; false if the path is counter-clockwise
 */
(function() {
  var category = 'google.maps.Polygon.isPathClockwise';
     // check that the GMaps API was already loaded
  if (null == google || null == google.maps || null == google.maps.Polygon) {
    console.error(category, 'Google Maps API not found');
    return;
  }
  if (typeof(google.maps.geometry.spherical.computeArea) !== 'function') {
    console.error(category, 'Google Maps geometry library not found');
    return;
  }

  if (typeof(google.maps.geometry.spherical.computeSignedArea) !== 'function') {
    console.error(category, 'Google Maps geometry library private function computeSignedArea() is missing; this may break this mixin');
  }

  function isPathClockwise(path) {
    var self = this,
        isCounterClockwise;

    if (null === path)
      throw new Error('Path is optional, but cannot be null');

    // default to the first path
    if (arguments.length === 0)
        path = self.getPath();

    // support for passing an index number to a path
    if (typeof(path) === 'number')
        path = self.getPaths().getAt(path);

    if (!path instanceof Array && !path instanceof google.maps.MVCArray)
      throw new Error('Path must be an Array or MVCArray');

    // negative polygon areas have counter-clockwise paths
    isCounterClockwise = (google.maps.geometry.spherical.computeSignedArea(path) < 0);

    return (!isCounterClockwise);
  }

  if (typeof(google.maps.Polygon.prototype.isPathClockwise) !== 'function') {
    google.maps.Polygon.prototype.isPathClockwise = isPathClockwise;
  }
})();
