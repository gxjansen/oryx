import {
  CartAdapter,
  cartNormalizers,
  CartNormalizers,
  cartsNormalizers,
  CartsNormalizers,
  DefaultCartAdapter,
} from './adapter';
import { CartService } from './cart.service';
import { DefaultCartService } from './default-cart.service';

export const cartProviders = [
  {
    provide: CartAdapter,
    useClass: DefaultCartAdapter,
  },
  {
    provide: CartService,
    useClass: DefaultCartService,
  },
  {
    provide: CartNormalizers,
    useValue: cartNormalizers,
  },
  {
    provide: CartsNormalizers,
    useValue: cartsNormalizers,
  },
];
