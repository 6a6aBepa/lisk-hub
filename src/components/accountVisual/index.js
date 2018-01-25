import React from 'react';
import { Gradients, gradientSchemes } from './gradients';
import styles from './accountVisual.css';

const Rect = props => <rect {...props} />;
const Circle = props => <circle {...props} />;
const Polygon = props => <polygon {...props} />;

const computeTriangle = props => (
  {
    points: [{
      x: props.x + (props.size / 2),
      y: props.y,
    }, {
      x: props.x + props.size,
      y: props.y + props.size,
    }, {
      x: props.x,
      y: props.y + props.size,
    },
    ].map(({ x, y }) => (`${x},${y}`)).join(' '),
  }
);

const computePentagon = props => (
  {
    points: [{
      x: props.x + (props.size / 2),
      y: props.y,
    }, {
      x: props.x + props.size,
      y: props.y + (props.size / 2.5),
    }, {
      x: props.x + (props.size - (props.size / 5)),
      y: props.y + props.size,
    }, {
      x: props.x + (props.size / 5),
      y: props.y + props.size,
    }, {
      x: props.x,
      y: props.y + (props.size / 2.5),
    },
    ].map(({ x, y }) => (`${x},${y}`)).join(' '),
  }
);

const getShape = (chunk, size, gradients, sizeScale = 1) => {
  const shapeNames = [
    'circle', 'triangle', 'square',
    'circle', 'triangle', 'square',
    'circle', 'triangle', 'square',
    'square',
  ];

  const sizes = [
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  ].map(x => x * (size / 90) * sizeScale);

  const coordinates = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ].map(x => x * (size / 20));

  const shapes = {
    circle: {
      component: Circle,
      props: {
        cx: coordinates[chunk[1]] + (sizes[chunk[3]] / 2),
        cy: coordinates[chunk[2]] + (sizes[chunk[3]] / 2),
        r: sizes[chunk[3]] / 2,
      },
    },
    square: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[3]],
      },
    },
    rect: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[4]],
      },
    },
    triangle: {
      component: Polygon,
      props: computeTriangle({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]],
      }),
    },
    pentagon: {
      component: Polygon,
      props: computePentagon({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]],
      }),
    },
  };

  return {
    component: shapes[shapeNames[chunk[0]]].component,
    props: {
      ...shapes[shapeNames[chunk[0]]].props,
      fill: gradients[chunk[4] % gradients.length].url,
    },
  };
};

const getBackgroundCircle = (chunk, size, gradient) => ({
  component: Circle,
  props: {
    cx: (size / 2),
    cy: (size / 2),
    r: (size / 2),
    fill: gradient.url,
  },
});

const getDominantShape = (chunk, size, gradient) => (
  getShape(chunk, size, [gradient], 6)
);

const AccountVisual = ({ address, size = 200 }) => {
  const addressChunks = address.padStart(21, '0').match(/\d{5}/g);
  const gradientScheme = gradientSchemes[addressChunks[0][2] % gradientSchemes.length];
  const shapes = [
    getBackgroundCircle(addressChunks[0], size, gradientScheme.primary),
    getDominantShape(addressChunks[1], size, gradientScheme.secondary),
    getShape(addressChunks[2], size, gradientScheme.additional, 2),
    getShape(addressChunks[3], size, gradientScheme.additional, 1),
  ];

  return (
    <div styles={{ height: size, width: size }} className={styles.wrapper}>
      <svg height={size} width={size} className={styles.accountVisual}>
        <Gradients scheme={gradientScheme}/>
        {shapes.map((shape, i) => (
          <shape.component {...shape.props} key={i} />
        ))}
      </svg>
    </div>
  );
};

export default AccountVisual;
