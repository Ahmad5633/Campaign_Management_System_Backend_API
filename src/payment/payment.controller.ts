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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('method')
  @ApiOperation({ summary: 'Add a new payment method' })
  // @ApiBody({ type: PaymentMethod }) // Use PaymentMethod as a type reference
  @ApiResponse({
    status: 201,
    description: 'Payment method added successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async addPaymentMethod(
    @Body() paymentMethodData: Partial<PaymentMethod>,
  ): Promise<PaymentMethod> {
    const paymentMethod =
      await this.paymentService.createPaymentMethod(paymentMethodData);
    return paymentMethod;
  }

  @Get('method/:id')
  @ApiOperation({ summary: 'Get payment method by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Payment method ID' })
  @ApiResponse({
    status: 200,
    description: 'Payment method retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Payment method not found' })
  async getPaymentMethodById(@Param('id') id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentService.getPaymentMethodById(id);
    if (!paymentMethod) {
      throw new NotFoundException('Payment method not found');
    }
    return paymentMethod;
  }

  @Post('pay')
  @ApiOperation({ summary: 'Make a payment' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        paymentMethodId: { type: 'string' },
        amount: { type: 'number' },
        currency: { type: 'string' },
      },
      required: ['paymentMethodId', 'amount', 'currency'],
    },
  })
  @ApiResponse({ status: 200, description: 'Payment successful' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
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
