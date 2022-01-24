import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';

const products = [
  {
    id: 1,
    name: 'Shoes',
    description: 'Running shoes',
    price: '$5',
    image: `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/run-asics-running-shoes-1636736175.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*`,
  },
  {
    id: 2,
    name: 'MacBook Pro',
    description: 'Apple MacBook',
    price: '$10',
    image: `https://i.pcmag.com/imagery/reviews/038Dr5TVEpwIv8rCljx6UcF-14..v1588802180.jpg`,
  },
];

function Products() {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Products;
