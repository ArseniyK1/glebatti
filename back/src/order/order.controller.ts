import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Role, Roles } from '../roles/decorators/roles.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-order')
  async createOrder(
    @Request() req: any,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return await this.orderService.createOrder(req.user, createOrderDto);
  }

  @Get('my-order')
  async myOrder(@Request() req: any) {
    return await this.orderService.myOrder(req.user.userId);
  }

  @Roles(Role.seller, Role.admin)
  @Get('open-orders')
  async getOpenOrders(@Request() req: any) {
    return await this.orderService.getOpenOrders(req.user.shopId);
  }

  @Patch('/success-order/:id')
  update(@Request() req: any, @Param('id') id: string) {
    return this.orderService.orderSuccess(req.user.userId, +id);
  }

  @Patch('/canceled-order/:id')
  async canceledOrder(@Param('id') id: string) {
    return await this.orderService.canceledOrder(+id);
  }
}
