// Local requirements
import { request } from './utils';

// ---- ACTIONS ---- //

export const processPayment = ({ amount, eleveId, nbPayments, paymentType }) => request(`payment/processPayment/`, { amount, eleveId, nbPayments, paymentType });
