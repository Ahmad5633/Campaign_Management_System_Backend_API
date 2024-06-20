// src/payment/payment.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { PaymentMethod } from './payment-method.schema';

@Injectable()
export class PaymentService {
  private stripeClient: Stripe;

  constructor(
    @InjectModel('PaymentMethod')
    private readonly paymentMethodModel: Model<PaymentMethod>,
  ) {
    this.stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10', // Replace with your preferred Stripe API version
    });
  }

  async createPaymentMethod(
    paymentMethodData: Partial<PaymentMethod>,
  ): Promise<PaymentMethod> {
    const createdPaymentMethod = new this.paymentMethodModel(paymentMethodData);
    return await createdPaymentMethod.save();
  }

  async getPaymentMethodById(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodModel.findById(id).exec();
    if (!paymentMethod) {
      throw new NotFoundException('Payment method not found');
    }
    return paymentMethod;
  }

  async payNow(
    paymentMethodId: string,
    amount: number,
    currency: string,
  ): Promise<Stripe.PaymentIntent> {
    const paymentMethod = await this.getPaymentMethodById(paymentMethodId);

    // Create payment method on Stripe
    const stripePaymentMethod = await this.stripeClient.paymentMethods.create({
      type: 'card',
      card: {
        number: paymentMethod.cardNumber,
        exp_month: parseInt(paymentMethod.expirationDate.split('/')[0], 10),
        exp_year: parseInt(paymentMethod.expirationDate.split('/')[1], 10),
        cvc: paymentMethod.cvc,
      },
    });

    // Create payment intent with Stripe
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount,
      currency,
      payment_method: stripePaymentMethod.id,
      confirm: true,
    });

    return paymentIntent;
  }
}
