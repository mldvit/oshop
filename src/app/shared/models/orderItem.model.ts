import { OrderProduct } from './orderProduct.model';

export interface OrderItem {
    product: OrderProduct;
    quantity: number;
    totalPrice: number;
}