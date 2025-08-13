import { Orm } from '../orm/orm';
import { pool } from '../connection-pool';

export interface Product {
  id: number;
  title: string;
  caption: string;
  description: string;
  image: string;
}

const tableName = 'products';

export const ProductRepository = new Orm<Product>(tableName, pool);