
import { Product } from "./repositories/product.repo"
import { ProductRepository } from "./repositories/product.repo";
import { initTable } from "./table/initTable";

const demoProduct: Partial<Product> = {
  title: 'Permanent Pen',
  caption: 'Black pen which can write 100m',
  description: 'Black pen which can write 100m. This pen allows you write for a long time and your hand will not tire of writing',
}

initTable();

const createProduct = await ProductRepository.save(demoProduct as Omit<Product, "id">);
console.log('Created Product:', createProduct);


const findProduct = await ProductRepository.findOne(createProduct.id);
console.log('Found Product:', findProduct);

const updateProduct = await ProductRepository.update(createProduct.id, {
  title: 'Ink Pen',
  caption: 'Ink pen with a smooth writing experience',
});

console.log('Updated Product:', updateProduct);

const findWithFilters = await ProductRepository.find({
  title: 'Permanent Pen',
});

console.log('Filtered Products:', findWithFilters);

await ProductRepository.delete(createProduct.id);
const checkIsDeleted = await ProductRepository.findOne(createProduct.id);

console.log('Check if Product is deleted:', checkIsDeleted);