## ![eppz!tools](http://www.eppz.eu/beacons/eppz!.png) labs!transform3D

Custom UIViewController transition playground. You plan the transformations, labs!transform3D spits out the iOS code for you. Not now, but soon.


#### Version tracking

* 0.7.9

    + Added more views
    + Merged helpers into eppz!js
        + Property bindings keep the UI updated
    + `Matrix3D` class holds the transformation model
        + Base of `CATransform3D` output (already composed in `m11` notation)
        + Some basic functions (`translate`, `rotateX`, etc.)
        + CSS output (`matrix3d();` output for editor UI)

* 0.7.0

    + New class hierarchy
        + EPPZView
        + TRScene
    + Awesome helpers to be merged into eppz!js
        + get~/setValueForKey/~keyPath helpers
        + Prototypes are now extended using `defineProperty`

* 0.6.0
    + Rebased project
        + eppz!js
        + Node/GruntJS
        + SASS/Compass
        + .gitignore
        + single file output (using beauty for now)

* 0.5.1
    + Some UI skin

* 0.5.0
    + Tons of features, factoring actually

* 0.0.2
    + Created slider that spits out CSS3 definitions


#### License

> Licensed under the [Open Source MIT license](http://en.wikipedia.org/wiki/MIT_License).

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/2873b2d81bd26e7c0d4ff1053f631cbb "githalytics.com")](http://githalytics.com/eppz/labs-filters)
