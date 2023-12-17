import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto';

@Controller('cars')
/* @UsePipes(ValidationPipe) */
export class CarsController {
  /* private cars = ['Toyota', 'Honda', 'Jeep']; */

  // Inyeccion de dependencias
  constructor(private readonly carsService: CarsService) { }

  @Get()
  getAllCars() {
    return this.carsService.findALL();
  }

  /*  @Get(':id')
   getCardById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
     return this.carsService.findOneById(id);
   } */

  @Get(':id')
  getCardById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOneById(id);
  }

  @Post()
  /*  @UsePipes(ValidationPipe) */
  createCar(@Body() body: CreateCarDto) {
    return this.carsService.create(body);
  }


  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCarDto) {
    return this.carsService.update(id, body);
  }


  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id);
  }
}
