import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentMethod } from './payment-method.schema';
import Stripe from 'stripe';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('method')
  async addPaymentMethod(
    @Body() paymentMethodData: Partial<PaymentMethod>,
  ): Promise<PaymentMethod> {
    const paymentMethod =
      await this.paymentService.createPaymentMethod(paymentMethodData);
    return paymentMethod;
  }

  @Get('method/:id')
  async getPaymentMethodById(@Param('id') id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentService.getPaymentMethodById(id);
    if (!paymentMethod) {
      throw new NotFoundException('Payment method not found');
    }
    return paymentMethod;
  }

  @Post('pay')
  async payNow(
    @Body()
    paymentData: {
      paymentMethodId: string;
      amount: number;
      currency: string;
    },
  ): Promise<Stripe.PaymentIntent> {
    const { paymentMethodId, amount, currency } = paymentData;
    const paymentIntent = await this.paymentService.payNow(
      paymentMethodId,
      amount,
      currency,
    );
    return paymentIntent;
  }
}
