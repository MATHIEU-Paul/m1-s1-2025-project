import { ClientPurchaseDetailsModel } from '../purchases/purchase.model';
import { ClientId } from './client.entity';

export type ClientModel = {
  id: ClientId;
  firstName: string;
  lastName: string;
  email?: string;
  imagePath?: string;
};

export type ClientDetailsModel = ClientModel & {
  purchases: ClientPurchaseDetailsModel[];
};

export type ClientWithPurchaseCountModel = ClientModel & {
  purchaseCount: number;
};

export type CreateClientModel = {
  firstName: string;
  lastName: string;
  email?: string;
  image?: string;
};

export type UpdateClientModel = Partial<CreateClientModel>;

export type FilterClientsModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof ClientModel, 'ASC' | 'DESC'>>;
};

export type GetClientsModel = {
  totalCount: number;
  data: ClientWithPurchaseCountModel[];
};