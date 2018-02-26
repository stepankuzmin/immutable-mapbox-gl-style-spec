// @flow

// import mapboxgl from 'mapbox-gl';
import { Record } from 'immutable';
import type { RecordFactory, RecordOf } from 'immutable';
import styleSpec from 'mapbox-gl/src/style-spec/reference/latest';

export const getDefaults = (object: Object) =>
  Object.keys(object).reduce(
    (acc, key: string) => Object.assign({}, acc, { [key]: object[key].default }),
    {}
  );

const LayerShape = Object.keys(styleSpec.layer).reduce(
  (acc, key: string) => Object.assign({}, acc, { [key]: undefined }),
  {}
);

export const LayerDefaultsByType = Object.keys(styleSpec.layer.type.values).reduce(
  (acc, type: string) => {
    const layer = Object.assign({}, LayerShape);

    layer.layout = getDefaults(styleSpec[`layout_${type}`]);
    layer.paint = getDefaults(styleSpec[`paint_${type}`]);

    acc[type] = layer;
    return acc;
  },
  {}
);

const {
  background,
  circle,
  fill,
  'fill-extrusion': fillExtrusion,
  line,
  raster,
  symbol
} = LayerDefaultsByType;

export type BackgroundLayer = RecordOf<BackgroundLayerSpecification>;
export const makeBackgroundLayer: RecordFactory<BackgroundLayerSpecification> = Record(background);

export type CircleLayer = RecordOf<CircleLayerSpecification>;
export const makeCircleLayer: RecordFactory<CircleLayerSpecification> = Record(circle);

export type FillLayer = RecordOf<FillLayerSpecification>;
export const makeFillLayer: RecordFactory<FillLayerSpecification> = Record(fill);

export type FillExtrusionLayer = RecordOf<FillExtrusionLayerSpecification>;
export const makeFillExtrusionLayer: RecordFactory<FillExtrusionLayerSpecification> = Record(fillExtrusion);

export type LineLayer = RecordOf<LineLayerSpecification>;
export const makeLineLayer: RecordFactory<LineLayerSpecification> = Record(line);

export type RasterLayer = RecordOf<RasterLayerSpecification>;
export const makeRasterLayer: RecordFactory<RasterLayerSpecification> = Record(raster);

export type SymbolLayer = RecordOf<SymbolLayerSpecification>;
export const makeSymbolLayer: RecordFactory<SymbolLayerSpecification> = Record(symbol);

export type Layer =
  | FillLayer
  | LineLayer
  | SymbolLayer
  | CircleLayer
  | FillExtrusionLayer
  | RasterLayer
  | BackgroundLayer;

export const makeLayer: RecordFactory<Layer> = (layer: Object) => {
  switch (layer.type) {
    case 'background':
      return makeBackgroundLayer(layer);
    case 'fill':
      return makeFillLayer(layer);
    case 'fill-extrusion':
      return makeFillExtrusionLayer(layer);
    case 'line':
      return makeLineLayer(layer);
    case 'raster':
      return makeRasterLayer(layer);
    case 'symbol':
      return makeSymbolLayer(layer);
    default:
      throw new Error(`Unknown type ${layer.type}`);
  }
};

type StyleSpecification = {|
  version: 8,
  name?: string,
  metadata?: mixed,
  center?: Array<number>,
  zoom?: number,
  bearing?: number,
  pitch?: number,
  light?: LightSpecification,
  sources: { [string]: SourceSpecification },
  sprite?: string,
  glyphs?: string,
  transition?: TransitionSpecification,
  layers: Array<Layer>
|};

export const StyleDefaults = {
  version: 8,
  name: undefined,
  metadata: undefined,
  center: undefined,
  zoom: undefined,
  bearing: 0,
  pitch: 0,
  light: undefined,
  sources: {},
  sprite: undefined,
  glyphs: undefined,
  transition: undefined,
  layers: []
};

export type Style = RecordOf<StyleSpecification>;
export const makeStyle: RecordFactory<StyleSpecification> = Record(StyleDefaults);
